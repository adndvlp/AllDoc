import {PythonCourseNote, type CourseNote} from '../PythonCourseNote';

export function SqlalchemyCourseCard({note}: {note?: CourseNote}) {
  return <PythonCourseNote note={note} kind="sqlalchemy" />;
}
