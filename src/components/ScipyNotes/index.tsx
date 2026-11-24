import {PythonCourseNote, type CourseNote} from '../PythonCourseNote';

export function ScipyCourseCard({note}: {note?: CourseNote}) {
  return <PythonCourseNote note={note} kind="scipy" />;
}
