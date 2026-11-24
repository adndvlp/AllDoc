import {inlineCode, PythonCourseNote, type CourseNote} from '../PythonCourseNote';

export function RequestsCourseCard({note}: {note?: CourseNote}) {
  const practice = 'En AllDoc, `requests` usa la API de pedidos simulada en memoria. Para probar en Python local, descarga el servidor de práctica, ejecútalo con `python datos.py` y prepara `import requests` y `BASE = "http://127.0.0.1:8765"`.';
  return <PythonCourseNote note={note && {...note, note: [note.note, practice].filter(Boolean).join(' ')}}
    kind="requests" formatText={inlineCode} downloadLabel="Descargar el servidor de práctica local" />;
}
