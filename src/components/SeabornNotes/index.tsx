import {PythonCourseNote, inlineCode, type CourseNote} from '../PythonCourseNote';

export function SeabornCourseCard({note}: {note?: CourseNote}) {
  return <PythonCourseNote note={note} kind="seaborn" formatText={inlineCode} />;
}
