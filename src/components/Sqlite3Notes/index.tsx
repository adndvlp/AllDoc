import {inlineCode, PythonCourseNote, type CourseNote} from '../PythonCourseNote';

export function Sqlite3CourseCard({note}: {note?: CourseNote}) {
  return <PythonCourseNote note={note} kind="sqlite3" formatText={inlineCode} />;
}
