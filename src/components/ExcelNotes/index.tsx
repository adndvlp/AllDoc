import {getConcept} from '@site/src/content/concepts';
import {ConceptNote, type NoteContent} from '../ConceptNote';
import {inlineCode, type CourseNote} from '../PythonCourseNote';
import {usePractice} from '../PracticeProvider';
import styles from '../SqlNotes/styles.module.css';

type Example = NoteContent['examples'][number];
const languages: Record<string, string> = {excel: 'excel-formula', vba: 'visual-basic'};

function TryFormula({example}: {example: Example}) {
  const practice = usePractice();
  return <button type="button" className={styles.tryExample} data-practice-example={example.id}
    aria-label={'Probar este ejemplo: ' + example.title} aria-haspopup="dialog" aria-controls="alldoc-practice-panel"
    onClick={event => {
      const context = practice.context;
      if (!context) return;
      event.currentTarget.focus({preventScroll: true});
      void import('@site/src/practice/adapters/excel/workbook').then(({excelExampleEdits, getSpreadsheet}) =>
        practice.openExample({id: example.id, languageId: 'excel',
          code: JSON.stringify(excelExampleEdits(example.code, getSpreadsheet(context.profile.defaultDataset.id)))}));
    }}>Probar</button>;
}

export function SpreadsheetCourseCard({note, tool}: {note?: CourseNote; tool: 'excel' | 'google-sheets'}) {
  const metadata = note && getConcept(note.id);
  if (!note || !metadata) throw new Error('Ficha de hoja de cálculo desconocida');
  return <ConceptNote concept={{...metadata, ...note, examples: note.examples.map(example => ({
    ...example, language: languages[example.language ?? ''] ?? example.language,
  }))}} conceptId={note.id} kind={tool} language="excel-formula" formatText={inlineCode}
    renderAction={example => example.language === 'excel-formula' && !example.external ? <TryFormula example={example} /> : null}
    afterContent={<a className={styles.datasetLink} href={'/practice/' + tool + '/datos.json'} download>Descargar los datos del libro</a>} />;
}

export function ExcelCourseCard({note}: {note?: CourseNote}) {
  return <SpreadsheetCourseCard note={note} tool="excel" />;
}
