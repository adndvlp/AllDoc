import {test} from 'node:test';
import assert from 'node:assert/strict';
import {runInNewContext} from 'node:vm';
import * as measurement from '../scripts/lib/practice-browser.mjs';

test('medición de navegador: conserva detail aunque PerformanceMeasure.toJSON lo omita', () => {
  const detail = {profileId: 'python-pandas', generation: 1, status: 'success'};
  const entry = {name: 'alldoc-practice/bootstrap', startTime: 12, duration: 3, detail,
    toJSON() {return {name: this.name, startTime: this.startTime, duration: this.duration};}};
  const values = runInNewContext('(' + measurement.readPracticeMeasures.toString() + ')()', {
    performance: {getEntriesByType(type) {assert.equal(type, 'measure'); return [entry, {...entry, name: 'ajena'}];}},
  });
  assert.deepEqual(JSON.parse(JSON.stringify(values)), [{name: entry.name, startTime: 12, duration: 3, detail}]);
});
