import {test} from 'node:test';
import assert from 'node:assert/strict';
import {canExecutePractice} from '../src/practice/interaction.ts';
import {context, workspace} from './fixtures/practice-session.ts';
import type {SessionSnapshot} from '../src/practice/session-manager.ts';

test('ejecutar: botón y atajo comparten permiso solo para un workspace habilitado y listo', () => {
  const own = workspace();
  const state: Pick<SessionSnapshot, 'context' | 'phase' | 'draft'> = {context: context(), phase: 'ready',
    draft: {workspace: own, status: 'saved', environmentChanged: false}};
  assert.equal(canExecutePractice(state, own), true);
  for (const phase of ['hidden', 'collapsed', 'loading', 'running', 'error'] as const) assert.equal(canExecutePractice({...state, phase}, own), false, phase);
  assert.equal(canExecutePractice({...state, draft: null}, own), false);
  assert.equal(canExecutePractice({...state, context: null}, own), false);
  assert.equal(canExecutePractice(state, null), false);
  assert.equal(canExecutePractice(state, workspace(context('pandas'))), false);
  assert.equal(canExecutePractice({...state, context: {...context(), profile: {...context().profile, availability: 'planned'}}}, own), false);
});
