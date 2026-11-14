import {useEffect, useRef, useState} from 'react';
import {mountPracticeEditor, type EditorHandle} from '@site/src/practice/editor-driver';
import type {RunRequest, RuntimeSchema, Workspace} from '@site/src/practice/contracts';
import type {SemanticCompletion} from '@site/src/practice/editor-completion';

export default function PracticeEditor(props: {workspace: Workspace; schema: RuntimeSchema; helpId: string;
  focusRequest?: number;
  onChange(id: string, path: string, content: string): void; onExecute(selection?: RunRequest['selection']): void;
  onComplete?: SemanticCompletion;
  onSelection?(id: string, path: string, selection?: RunRequest['selection']): void}) {
  const parent = useRef<HTMLDivElement>(null); const editor = useRef<EditorHandle | null>(null);
  const latest = useRef(props); latest.current = props;
  const [error, setError] = useState<string | null>(null); const [attempt, setAttempt] = useState(0);
  const focusRequested = () => {
    if (latest.current.focusRequest && parent.current?.closest('dialog')?.open)
      parent.current.querySelector<HTMLElement>('[role="textbox"]')?.focus({preventScroll: true});
  };
  useEffect(() => {
    let cancelled = false; setError(null);
    void mountPracticeEditor(parent.current!, {...latest.current,
      onChange: (...args) => latest.current.onChange(...args), onExecute: (...args) => latest.current.onExecute(...args),
      onComplete: (...args) => latest.current.onComplete?.(...args) ?? Promise.resolve(null),
      onSelection: (...args) => latest.current.onSelection?.(...args)})
      .then(async (handle) => {
        if (cancelled) {handle.destroy(); return;}
        editor.current = handle; await handle.update(latest.current.workspace, latest.current.schema);
        if (!cancelled) focusRequested();
      })
      .catch((reason) => {if (!cancelled) setError(String(reason));});
    return () => {cancelled = true; editor.current?.destroy(); editor.current = null;};
  }, [attempt]);
  useEffect(() => {focusRequested();}, [props.focusRequest]);
  useEffect(() => {void editor.current?.update(props.workspace, props.schema).catch((reason) => setError(String(reason)));}, [props.workspace, props.schema]);
  return <>
    {error && <div role="alert">No se pudo preparar el editor. <button type="button" onClick={() => setAttempt((value) => value + 1)}>Reintentar editor</button></div>}
    <div ref={parent} data-practice-editor style={{flex: '1 1 0', minHeight: 0, minWidth: 0, overflow: 'hidden'}} />
  </>;
}
