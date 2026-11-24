import {inlineCode, PythonCourseNote, type CourseNote} from '../PythonCourseNote';

export function OpenpyxlCourseCard({note}: {note?: CourseNote}) {
  return <PythonCourseNote note={note} kind="openpyxl" formatText={inlineCode} />;
}
