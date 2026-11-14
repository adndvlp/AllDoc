import {useEffect, useRef, useState} from 'react';
import {mountPracticeEditor, type EditorHandle} from '@site/src/practice/editor-driver';
import type {RunRequest, RuntimeSchema, Workspace} from '@site/src/practice/contracts';

export default function PracticeEditor(props: {workspace: Workspace; schema: RuntimeSchema; helpId: string;
  onChange(id: string, path: string, content: string): void; onExecute(selection?: RunRequest['selection']): void}) {
  const parent = useRef<HTMLDivElement>(null); const editor = useRef<EditorHandle | null>(null);
  const latest = useRef(props); latest.current = props;
  const [error, setError] = useState<string | null>(null); const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false; setError(null);
    void mountPracticeEditor(parent.current!, {...latest.current,
      onChange: (...args) => latest.current.onChange(...args), onExecute: (...args) => latest.current.onExecute(...args)})
      .then((handle) => {if (cancelled) handle.destroy(); else {editor.current = handle; void handle.update(latest.current.workspace, latest.current.schema);}})
      .catch((reason) => {if (!cancelled) setError(String(reason));});
    return () => {cancelled = true; editor.current?.destroy(); editor.current = null;};
  }, [attempt]);
  useEffect(() => {void editor.current?.update(props.workspace, props.schema).catch((reason) => setError(String(reason)));}, [props.workspace, props.schema]);
  return <>
    {error && <div role="alert">No se pudo preparar el editor. <button type="button" onClick={() => setAttempt((value) => value + 1)}>Reintentar editor</button></div>}
    <div ref={parent} data-practice-editor style={{flex: '1 1 0', minHeight: 0, minWidth: 0, overflow: 'hidden'}} />
  </>;
}
