/** Progreso portable: no depende de CDP ni imprime las trazas completas. */
export default class BrowserProgress {
  constructor(options = {}) {this.compact = options.compact === true; this.active = new Map(); this.counts = {passed: 0, skipped: 0, failed: 0};}
  onBegin(_config, suite) {
    this.total = suite.allTests().length; this.started = Date.now();
    console.log(`Casos: ${this.total}; dos workers como máximo, sin reintentos.`);
    this.timer = setInterval(() => this.progress(), 15_000); this.timer.unref();
  }
  onTestBegin(test) {
    const label = test.parent.project().name + ' / ' + test.title;
    this.active.set(test.id, {label, phase: 'preparación del caso', started: Date.now()});
    if (!this.compact) console.log('Inicio: ' + label);
  }
  onStepBegin(test, _result, step) {
    if (step.category === 'test.step' && this.active.has(test.id)) this.active.get(test.id).phase = step.title;
  }
  onTestEnd(test, result) {
    const entry = this.active.get(test.id); this.active.delete(test.id);
    const status = result.status === 'passed' && test.expectedStatus === 'passed' ? 'passed' : result.status === 'skipped' ? 'skipped' : 'failed';
    this.counts[status]++;
    if (!this.compact || status === 'failed') console.log(`${status}: ${entry?.label ?? test.title} (${(result.duration / 1000).toFixed(1)} s)`);
    if (status === 'failed') console.log('Diagnóstico: ' + (result.error?.message ?? result.status).replace(/\u001b\[[0-9;]*m/g, '').split('\n').find(line => line.trim())?.slice(0, 240));
  }
  onError(error) {console.log('Error global: ' + error.message?.split('\n')[0].slice(0, 240));}
  progress() {
    console.log(`Progreso: ${this.counts.passed} aprobados, ${this.counts.skipped} omitidos, ${this.counts.failed} fallidos / ${this.total}; ${Math.round((Date.now() - this.started) / 1000)} s.`);
    for (const entry of this.active.values()) console.log(`En curso: ${entry.label} · ${entry.phase} · ${Math.round((Date.now() - entry.started) / 1000)} s`);
  }
  onEnd() {clearInterval(this.timer); this.progress();}
  printsToStdio() {return true;}
}
