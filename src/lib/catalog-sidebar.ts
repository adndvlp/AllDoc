import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import type {CatalogArea, CatalogNode} from '../content/catalog';
import {sqlDocIdForLocation} from '../content/sql/placements.ts';

type SidebarItemConfig = Extract<SidebarsConfig[string], unknown[]>[number];
type SidebarCategory = Extract<SidebarItemConfig, {type: 'category'}>;

function sidebarItem(node: CatalogNode): SidebarCategory {
  const items: SidebarItemConfig[] = node.kind === 'group'
    ? node.items.map(sidebarItem)
    : node.sections?.length
      ? node.sections.map(group=>({type:'category',label:group.label,collapsed:true,collapsible:true,className:'sidebar-sql-group',items:group.concepts.map(c=>({type:'doc',id:sqlDocIdForLocation(c.id,node.areaId as 'analisis-de-datos'|'lenguajes')!,label:c.label}))}))
    : node.concepts.length
      ? node.concepts.map((concept) => concept.docId??concept.id)
      : [{type: 'html', value: '<span class="sidebar-empty-note">Sin apuntes todavía</span>', defaultStyle: false}];
  return {
    type: 'category', label: node.label, collapsed: true, collapsible: true,
    ...(node.kind === 'group' ? {className: 'sidebar-topic-group'} : node.sections?.length?{className:'sidebar-sql-topic'}:{}),
    items,
  };
}

export function createSidebars(areas: readonly CatalogArea[]): Record<string, SidebarCategory[]> {
  return Object.fromEntries(areas.filter((area) => area.items.length > 0)
    .map((area) => [area.sidebarId, area.items.map(sidebarItem)]));
}
