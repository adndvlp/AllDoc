import {PythonCourseNote, inlineCode, type CourseNote} from '../PythonCourseNote';

export function MatplotlibCourseCard({note}: {note?: CourseNote}) {
  return <PythonCourseNote note={note} kind="matplotlib" formatText={inlineCode} />;
}
