export type PracticeLayout = 'parallel' | 'bottom' | 'modal';
export type PracticeSpace = {width: number; height: number; rem: number};
export function practiceSurface({width,height,rem}: PracticeSpace): 'stacked'|'compact' {
  return width >= 32 * rem && height >= 34 * rem ? 'stacked' : 'compact';
}
export function practiceLayout({width, height, rem}: PracticeSpace): PracticeLayout {
  if (height < 38 * rem) return 'modal';
  if (width >= 54 * rem + 8) return 'parallel';
  return width >= 40 * rem ? 'bottom' : 'modal';
}
export function practiceSize(space: PracticeSpace, layout: PracticeLayout, requested?: number): {min: number; max: number; value: number} {
  const {width, height, rem} = space;
  if (layout === 'modal') return {min: height, max: height, value: height};
  const min = (layout === 'parallel' ? 28 : 20) * rem;
  const max = Math.max(min, layout === 'parallel' ? width - 26 * rem - 8 : height - 14 * rem - 8);
  const initial = layout === 'parallel' ? width * .48 : height * .46;
  return {min, max, value: Math.round(Math.min(max, Math.max(min, requested ?? initial)))};
}
