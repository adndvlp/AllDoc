import {inlineCode, PythonCourseNote, type CourseNote} from '../PythonCourseNote';

export function JsonCourseCard({note}: {note?: CourseNote}) {
  return <PythonCourseNote note={note} kind="json" formatText={inlineCode} />;
}
