import {Compartment, EditorState, Prec, Transaction} from '@codemirror/state';
import {EditorView, drawSelection, dropCursor, highlightSpecialChars, keymap, lineNumbers} from '@codemirror/view';
import {defaultKeymap, history, historyKeymap} from '@codemirror/commands';
import {autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap} from '@codemirror/autocomplete';
import {HighlightStyle, indentOnInput, syntaxHighlighting} from '@codemirror/language';
import {tags} from '@lezer/highlight';
import {editorLanguage} from './editor-language.ts';
import {createEditorCompletionSource, type SemanticCompletion} from './editor-completion.ts';
import type {RunRequest, RuntimeSchema, Workspace} from './contracts.ts';

export type EditorHandle = {update(workspace: Workspace, schema: RuntimeSchema): Promise<void>; destroy(): void};
type Options = {workspace: Workspace; schema: RuntimeSchema; helpId: string;
  onChange(id: string, path: string, content: string): void; onExecute(selection?: RunRequest['selection']): void;
  onComplete?: SemanticCompletion;
  onSelection?(id: string, path: string, selection?: RunRequest['selection']): void};

const theme = EditorView.theme({
  '&': {height: '100%', backgroundColor: 'var(--canvas)', color: 'var(--text-primary)', fontSize: '.875rem'},
  '&.cm-focused': {outline: '2px solid var(--accent)', outlineOffset: '-2px'},
  '.cm-scroller': {overflow: 'auto', overscrollBehavior: 'none', fontFamily: 'var(--ifm-font-family-monospace)', lineHeight: '1.65', scrollbarWidth: 'thin'},
  '.cm-content': {padding: '.75rem 0', caretColor: 'var(--accent)'},
  '.cm-line': {padding: '0 .75rem'},
  '.cm-gutters': {backgroundColor: 'var(--canvas)', color: 'var(--text-muted)', borderRight: '1px solid var(--border-subtle)'},
  '.cm-cursor, .cm-dropCursor': {borderLeftColor: 'var(--accent)'},
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {backgroundColor: 'color-mix(in srgb, var(--accent) 25%, transparent)'},
  '.cm-tooltip': {maxWidth: 'calc(100vw - 2rem)', backgroundColor: 'var(--canvas)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)'},
  '.cm-tooltip-autocomplete ul': {maxHeight: '10rem', fontFamily: 'inherit'},
  '.cm-tooltip-autocomplete ul li[aria-selected]': {backgroundColor: 'var(--accent)', color: '#000'},
}, {dark: true});
const highlighting = HighlightStyle.define([
  {tag: [tags.keyword, tags.modifier], color: 'var(--syntax-keyword, var(--accent))'},
  {tag: [tags.operator, tags.punctuation], color: 'var(--syntax-operator)'},
  {tag: tags.number, color: 'var(--syntax-number)'},
  {tag: tags.string, color: 'var(--syntax-string)'},
  {tag: tags.comment, color: 'var(--syntax-comment)'},
  {tag: tags.function(tags.variableName), color: 'var(--syntax-function)'},
]);

/** Una vista, un estado por workspace. El acento es CSS; no reconfigura el historial. */
export async function mountPracticeEditor(parent: HTMLElement, options: Options): Promise<EditorHandle> {
  const language = new Compartment(); const attributes = new Compartment();
  const states = new Map<string, EditorState>(); let current = options.workspace;
  let schema = options.schema; let version = 0; let destroyed = false;
  const name = (workspace: Workspace) => workspace.files.find((file) => file.path === workspace.activeFile)!;
  const attrs = (workspace: Workspace) => EditorView.contentAttributes.of({role: 'textbox', 'aria-multiline': 'true',
    'aria-label': `Código ${workspace.toolKey === 'analisis-de-datos/sql' ? 'SQL' : workspace.toolKey === 'analisis-de-datos/pandas' ? 'pandas' : name(workspace).languageId}`, 'aria-describedby': options.helpId,
    spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off'});
  const semantic = options.onComplete ? createEditorCompletionSource(options.onComplete) : undefined;
  const initialLanguage = await editorLanguage(name(current).languageId, schema, semantic);
  const extensions = [theme, syntaxHighlighting(highlighting), history(), lineNumbers(), drawSelection(), dropCursor(),
    highlightSpecialChars(), indentOnInput(), closeBrackets(), autocompletion(),
    Prec.highest(keymap.of([{key: 'Mod-Enter', run(view) {
      if (view.composing) return false;
      const {from, to, empty} = view.state.selection.main; options.onExecute(empty ? undefined : {from, to}); return true;
    }}])),
    // Ctrl+K pertenece al buscador global. Tab conserva la salida de foco nativa.
    keymap.of([...completionKeymap, ...closeBracketsKeymap, ...defaultKeymap.filter((binding) =>
      ![binding.key, binding.mac, binding.win, binding.linux].some((value) => value?.toLowerCase() === 'ctrl-k')), ...historyKeymap]),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) options.onChange(current.id, current.activeFile, update.state.doc.toString());
      if (update.selectionSet || update.docChanged) {
        const {from, to, empty} = update.state.selection.main;
        options.onSelection?.(current.id, current.activeFile, empty ? undefined : {from, to});
      }
    })];
  const createState = (workspace: Workspace, support: Awaited<ReturnType<typeof editorLanguage>>) => EditorState.create({
    doc: name(workspace).content, extensions: [...extensions, language.of(support), attributes.of(attrs(workspace))]});
  const view = new EditorView({parent, state: createState(current, initialLanguage)});
  return {
    async update(workspace, nextSchema) {
      const token = ++version;
      const same = current.id === workspace.id && current.activeFile === workspace.activeFile;
      if (same && schema === nextSchema && view.state.doc.toString() === name(workspace).content) {current = workspace; return;}
      const support = await editorLanguage(name(workspace).languageId, nextSchema, semantic);
      if (destroyed || token !== version) return;
      if (!same) {
        states.set(current.id, view.state); current = workspace;
        const saved = states.get(workspace.id);
        view.setState(saved ?? createState(workspace, support));
      } else current = workspace;
      schema = nextSchema;
      const content = name(workspace).content;
      view.dispatch({effects: [language.reconfigure(support), attributes.reconfigure(attrs(workspace))],
        ...(view.state.doc.toString() !== content ? {changes: {from: 0, to: view.state.doc.length, insert: content}, annotations: Transaction.addToHistory.of(false)} : {})});
      const {from, to, empty} = view.state.selection.main;
      options.onSelection?.(current.id, current.activeFile, empty ? undefined : {from, to});
    },
    destroy() {destroyed = true; version++; states.clear(); view.destroy();},
  };
}
