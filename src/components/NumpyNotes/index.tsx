import {PythonCourseNote, type CourseNote} from '../PythonCourseNote';

export function NumpyCourseCard({note}: {note?: CourseNote}) {
  return <PythonCourseNote note={note} kind="numpy" />;
}
