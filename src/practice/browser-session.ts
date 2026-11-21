import {createDraftStore} from './drafts.ts';
import {createIndexedDBDraftRepository} from './indexeddb-drafts.ts';
import {createPracticeSessionManager} from './session-manager.ts';
import {practiceRegistry} from './profiles.ts';
import {editorBootstrap} from './editor-bootstrap.ts';
import {sqlDraftMigrationCandidates} from './sql-draft-migration.ts';

export function createBrowserPracticeSession() {
  const drafts = createDraftStore(() => createIndexedDBDraftRepository(),{migrationCandidates:sqlDraftMigrationCandidates});
  const manager = createPracticeSessionManager({registry: practiceRegistry, drafts, bootstrap: editorBootstrap});
  return {manager, flush: () => drafts.flush(), async dispose() {await manager.dispose(); await drafts.close();}};
}
