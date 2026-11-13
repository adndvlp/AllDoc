import {Collapsible, useCollapsible} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import OriginalCategory from '@theme-original/DocSidebarItem/Category';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebarItem/Category';
import TopicIcon from '@site/src/components/TopicIcon';
import styles from './styles.module.css';

function ToggleCategory({item, activePath, onItemClick, level, tabIndex}: Props) {
  const {collapsed, setCollapsed} = useCollapsible({
    // Respect the configured default even when this category contains the current page.
    initialState: item.collapsed,
  });
  const isActive = isActiveSidebarItem(item, activePath);

  return (
    <li
      className={[
        'theme-doc-sidebar-item-category',
        'theme-doc-sidebar-item-category-level-' + level,
        'menu__list-item',
        collapsed && 'menu__list-item--collapsed',
        item.className,
      ].filter(Boolean).join(' ')}>
      <div className="menu__list-item-collapsible">
        <button
          type="button"
          className={[
            'clean-btn menu__link menu__link--sublist menu__link--sublist-caret',
            styles.control,
            isActive && 'menu__link--active',
          ].filter(Boolean).join(' ')}
          tabIndex={tabIndex}
          aria-expanded={!collapsed}
          onClick={() => {
            onItemClick?.(item);
            setCollapsed(!collapsed);
          }}>
          <TopicIcon label={item.label} className={styles.icon} />
          <span className={styles.label}>{item.label}</span>
        </button>
      </div>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={item.items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}

export default function DocSidebarItemCategory(props: Props) {
  if (props.item.href || !props.item.collapsible || props.item.items.length === 0) {
    return <OriginalCategory {...props} />;
  }
  return <ToggleCategory {...props} />;
}
