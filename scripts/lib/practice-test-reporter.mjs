// NDJSON conserva cada caso con su archivo, sin depender del texto del reporter.
export default async function* report(source) {
  for await (const event of source) if (event.type === 'test:pass' || event.type === 'test:fail') {
    const data = event.data;
    yield JSON.stringify({file: data.file ?? '', name: data.name, status: event.type === 'test:pass' ? 'passed' : 'failed',
      skipped: Boolean(data.skip), line: data.line, durationMs: data.details?.duration_ms,
      error: event.type === 'test:fail' ? String(data.details?.error?.message ?? 'fallo') : undefined}) + '\n';
  }
}
