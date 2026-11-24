import {createCourseArchive, emitCourse, parseCourse, parseInlineExample} from './lib/course-notes.mjs';

function projectFiles(data) {
  const [setup, reference] = data.split('### Recursos de referencia\n');
  const [project, profile] = Array.from(setup.matchAll(/^```yaml\n([\s\S]+?)\n```$/gm), match => match[1]);
  const seed = setup.match(/^```sql\n([\s\S]+?)\n```$/m)?.[1];
  if (!project || !profile || !seed || !reference) throw new Error('Falta la preparación del proyecto dbt');
  const resources = Array.from(reference.matchAll(/^`((?:models|seeds)(?:\/[\w-]+)+\.(?:ya?ml|sql|csv))`:\n\n```(?:yaml|sql|csv)\n([\s\S]+?)\n```$/gm),
    ([, name, body]) => [name, body]);
  if (resources.length !== 8 || new Set(resources.map(([name]) => name)).size !== resources.length) {
    throw new Error('Modelos, fuentes o seeds incompletos o repetidos en el proyecto dbt');
  }
  return Object.fromEntries([['dbt_project.yml', project], ['profiles.example.yml', profile], ['datos.sql', seed], ...resources]);
}

export function parseDbtSource(markdown) {
  return parseCourse(markdown, 'dbt', (part, id) => ({...parseInlineExample(part, id), external: true}), /\s+·\s+/, projectFiles);
}

async function prepareDbtSource(markdown) {
  const {groups, bootstrap: files} = parseDbtSource(markdown);
  const zip = await createCourseArchive('tienda_dbt', files, ['tests', 'macros', 'snapshots', 'analyses']);
  return {groups, downloads: {'tienda_dbt.zip': zip}};
}

if (import.meta.main) {
  const count = await emitCourse({tool: 'dbt', component: 'Dbt', parse: prepareDbtSource, check: process.argv.includes('--check')});
  console.log(`dbt: ${count} fichas cotejadas con specs/dbt.md.`);
}
