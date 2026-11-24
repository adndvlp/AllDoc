import {SpreadsheetCourseCard} from '../ExcelNotes';
import type {CourseNote} from '../PythonCourseNote';

export function GoogleSheetsCourseCard({note}: {note?: CourseNote}) {
  return <SpreadsheetCourseCard note={note} tool="google-sheets" />;
}
