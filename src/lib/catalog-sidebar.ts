import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import type {CatalogArea, CatalogNode} from '../content/catalog';
import {sqlDocIdForLocation} from '../content/sql/placements.ts';

type SidebarItemConfig = Extract<SidebarsConfig[string], unknown[]>[number];
type SidebarCategory = Extract<SidebarItemConfig, {type: 'category'}>;

function sidebarItem(node: CatalogNode): SidebarCategory {
  const isSql = node.kind === 'topic' && node.id === 'sql';
  const items: SidebarItemConfig[] = node.kind === 'group'
    ? node.items.map(sidebarItem)
    : node.sections?.length
      ? node.sections.map(group => ({
        type: 'category', label: group.label, collapsed: true, collapsible: true,
        ...(isSql ? {className: 'sidebar-sql-group'} : {}),
        items: group.concepts.map(concept => node.sharedFrom && !isSql
          ? {type: 'link', label: concept.label, href: concept.slug}
          : {type: 'doc', label: concept.label,
            id: isSql ? sqlDocIdForLocation(concept.id, node.areaId as 'analisis-de-datos' | 'lenguajes')! : concept.docId ?? concept.id}),
      }))
    : node.concepts.length
      ? node.concepts.map((concept) => concept.docId??concept.id)
      : [{type: 'html', value: '<span class="sidebar-empty-note">Sin apuntes todavía</span>', defaultStyle: false}];
  return {
    type: 'category', label: node.label, collapsed: true, collapsible: true,
    ...(node.kind === 'group' ? {className: 'sidebar-topic-group'} : isSql && node.sections?.length ? {className: 'sidebar-sql-topic'} : {}),
    items,
  };
}

export function createSidebars(areas: readonly CatalogArea[]): Record<string, SidebarCategory[]> {
  return Object.fromEntries(areas.filter((area) => area.items.length > 0)
    .map((area) => [area.sidebarId, area.items.map(sidebarItem)]));
}
