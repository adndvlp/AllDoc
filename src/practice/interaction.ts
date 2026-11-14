import type {Workspace} from './contracts.ts';
import type {SessionSnapshot} from './session-manager.ts';
export function canExecutePractice(state: Pick<SessionSnapshot, 'context' | 'phase' | 'draft'>, workspace: Workspace | null): boolean {
  return state.phase === 'ready' && state.context?.profile.availability === 'enabled'
    && !!workspace && state.context.workspaceKey === workspace.id && state.draft?.workspace.id === workspace.id;
}
