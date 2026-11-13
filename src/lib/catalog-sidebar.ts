import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import type {CatalogArea, CatalogNode} from '../content/catalog';

type SidebarItemConfig = Extract<SidebarsConfig[string], unknown[]>[number];
type SidebarCategory = Extract<SidebarItemConfig, {type: 'category'}>;

function sidebarItem(node: CatalogNode): SidebarCategory {
  const items: SidebarItemConfig[] = node.kind === 'group'
    ? node.items.map(sidebarItem)
    : node.concepts.length
      ? node.concepts.map((concept) => concept.id)
      : [{type: 'html', value: '<span class="sidebar-empty-note">Sin apuntes todavía</span>', defaultStyle: false}];
  return {
    type: 'category', label: node.label, collapsed: true, collapsible: true,
    ...(node.kind === 'group' ? {className: 'sidebar-topic-group'} : {}),
    items,
  };
}

export function createSidebars(areas: readonly CatalogArea[]): Record<string, SidebarCategory[]> {
  return Object.fromEntries(areas.filter((area) => area.items.length > 0)
    .map((area) => [area.sidebarId, area.items.map(sidebarItem)]));
}
