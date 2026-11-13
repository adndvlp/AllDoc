import type {KeyboardEvent, RefObject} from 'react';

export function searchKeyboard(input: RefObject<HTMLInputElement | null>, list: RefObject<HTMLUListElement | null>) {
  return {
    onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
        list.current?.querySelector('a')?.click();
      }
      if (event.key === 'ArrowDown' && !event.nativeEvent.isComposing) {
        event.preventDefault();
        list.current?.querySelector('a')?.focus();
      }
    },
    onResultsKeyDown(event: KeyboardEvent<HTMLUListElement>) {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      const links = [...(list.current?.querySelectorAll('a') ?? [])];
      const current = links.indexOf(document.activeElement as HTMLAnchorElement);
      const next = current + (event.key === 'ArrowDown' ? 1 : -1);
      if (next < 0) input.current?.focus();
      else links[Math.min(next, links.length - 1)]?.focus();
    },
  };
}
