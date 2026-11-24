import {inlineCode, PythonCourseNote, type CourseNote} from '../PythonCourseNote';

export function HttpxCourseCard({note}: {note?: CourseNote}) {
  const practice = 'En AllDoc, `demo()` y `demo_async()` consultan la API de pedidos en memoria con `httpx.MockTransport`.';
  const asynchronous = note?.examples.some(example => example.practiceCode)
    ? ' El editor abre este ejemplo con `await main()` porque el entorno ya tiene un bucle asíncrono activo.' : '';
  return <PythonCourseNote note={note && {...note, note: [note.note, practice + asynchronous].filter(Boolean).join(' ')}}
    kind="httpx" formatText={inlineCode} downloadLabel="Descargar los datos y la API simulada" />;
}
