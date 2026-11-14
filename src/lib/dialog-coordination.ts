export const suspendDialogEvent = 'alldoc:suspend-dialog';
export function hasOtherModal(dialog: HTMLDialogElement): boolean {
  const active = dialog.ownerDocument.querySelector('dialog:modal'); return active !== null && active !== dialog;
}

/** Cerrar primero preserva una sola capa modal y un invocador visible. */
export function openExclusiveModal(dialog: HTMLDialogElement, fallbackInvoker?: HTMLElement | null) {
  let replaced = false;
  for (const other of Array.from(dialog.ownerDocument.querySelectorAll<HTMLDialogElement>('dialog:modal'))) {
    if (other === dialog) continue;
    other.dispatchEvent(new Event(suspendDialogEvent)); other.close(); replaced = true;
  }
  if (replaced) fallbackInvoker?.focus({preventScroll: true});
  if (!dialog.open) dialog.showModal();
}
