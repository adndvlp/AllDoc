import {browserReportCases,assessChromiumRegression,strictReportReasons} from '../../scripts/lib/browser-acceptance.ts';

export function reviewToolingChanges(before,after,reviewed) {
  for(const rows of [before,after,reviewed])if(new Set(rows.map(f=>f.path)).size!==rows.length)throw new Error('Inventario duplicado');
  const a=new Map(before.map(f=>[f.path,f.sha256])),b=new Map(after.map(f=>[f.path,f.sha256]));
  const changes=[...new Set([...a.keys(),...b.keys()])].sort().filter(p=>a.get(p)!==b.get(p)).map(p=>({path:p,before:a.get(p)??null,after:b.get(p)??null}));
  const normalized=reviewed.map(({path,before,after})=>({path,before,after})).sort((a,b)=>a.path.localeCompare(b.path));
  if(JSON.stringify(changes)!==JSON.stringify(normalized))throw new Error('Cambio de herramienta no revisado');
  return changes;
}

export function combineChromiumParts(parts,discovery) {
  const expected=browserReportCases(discovery),keys=new Set(expected.map(c=>c.key)),selected=new Map(),sources=[];
  if(!expected.length||keys.size!==expected.length)throw new Error('Descubrimiento vacío o duplicado');
  for(const part of parts) {
    const strict=strictReportReasons(part.raw,'chromium');if(strict.length)throw new Error(part.label+': '+strict.join('; '));
    if(part.raw.stats?.flaky!==0)throw new Error('Fuente con resultado inestable: '+part.label);
    if(part.raw.errors?.length&&JSON.stringify(part.raw.errors)!==JSON.stringify(part.reviewedGlobalErrors))throw new Error('Errores globales sin revisión: '+part.label);
    let count=0;
    for(const c of browserReportCases(part.raw).filter(part.select)) {
      if(!keys.has(c.key))throw new Error('Caso ajeno al descubrimiento: '+c.key);
      if(selected.has(c.key))throw new Error('Caso duplicado: '+c.key);
      const results=c.test.results??[],r=results[0];
      const passed=c.test.expectedStatus==='passed'&&c.test.status==='expected'&&r?.status==='passed';
      const skipped=c.test.expectedStatus==='skipped'&&c.test.status==='skipped'&&r?.status==='skipped';
      if(results.length!==1||r.retry!==0||r.errors?.length||(!passed&&!skipped))throw new Error('Caso seleccionado sin aprobación estricta: '+c.key);
      selected.set(c.key,{test:structuredClone(c.test),source:part.label,project:c.project,file:c.file,title:c.title,line:c.line,column:c.column});count++;
    }
    sources.push({label:part.label,selectedCases:count,stats:structuredClone(part.raw.stats),errors:structuredClone(part.raw.errors??[]),rawFile:part.rawFile,sha256:part.sha256});
  }
  for(const c of expected)if(!selected.has(c.key))throw new Error('Falta caso: '+c.key);
  const combined=structuredClone(discovery);let passed=0,skipped=0;
  for(const c of browserReportCases(combined)) {
    const source=selected.get(c.key);Object.assign(c.test,structuredClone(source.test));
    if(c.test.results[0].status==='passed')passed++;else skipped++;
  }
  const dates=parts.map(p=>p.raw.stats.startTime).filter(s=>Number.isFinite(Date.parse(s))).sort((a,b)=>Date.parse(a)-Date.parse(b));
  combined.kind='consolidated-evidence';combined.errors=[];
  combined.stats={startTime:dates[0],expected:passed,skipped,unexpected:0,flaky:0};
  combined.provenance={sources,cases:[...selected].map(([key,{test,...source}])=>({key,...source,status:test.results[0].status,startTime:test.results[0].startTime})),
    timing:'Evidencia de ejecuciones separadas; startTime es el inicio más antiguo. No representa la duración de una sola suite.'};
  const assessment=assessChromiumRegression(combined,discovery);
  if(assessment.status!=='passed')throw new Error(assessment.reasons.join('; '));
  return combined;
}
