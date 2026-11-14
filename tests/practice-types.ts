import type {CompletionAdapter, DatasetAdapter, PracticeRegistration, RuntimeAdapter, RuntimeEvent} from '../src/practice/contracts.ts';
import {sqlProfile} from './fixtures/practice.ts';

// Contratos de compilación; no se ejecutan como pruebas ni cargan un motor.
function checkContracts(runtime: RuntimeAdapter, completion: CompletionAdapter, dataset: DatasetAdapter) {
  const enabled: PracticeRegistration = {profile: sqlProfile, loaders: {
    async runtime() {return () => runtime;}, async completion() {return () => completion;}, async dataset() {return () => dataset;},
  }};
  // @ts-expect-error Un perfil habilitado necesita todos sus loaders.
  const withoutProviders: PracticeRegistration = {profile: sqlProfile};
  // @ts-expect-error Un perfil planeado no publica loaders ejecutables.
  const plannedWithProviders: PracticeRegistration = {profile: {...sqlProfile, availability: 'planned'}, loaders: enabled.loaders};
  // @ts-expect-error Las celdas no transportan handles ni objetos arbitrarios.
  const invalidCell: RuntimeEvent = {protocolVersion: 1, runId: 'r', generation: 0, revision: 0, type: 'table', columns: [], rows: [[{handle: 1}]], truncated: false};
  void [enabled, withoutProviders, plannedWithProviders, invalidCell];
}
void checkContracts;
