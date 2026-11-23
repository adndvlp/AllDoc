import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import StructuredData from '@theme/DocBreadcrumbs/StructuredData';
import {areas} from '@site/src/content/areas';
import styles from './styles.module.css';

export default function DocBreadcrumbs(){
 const breadcrumbs=useSidebarBreadcrumbs();const {pathname}=useLocation();
 if(!breadcrumbs)return null;
 const area=areas.find(a=>pathname.startsWith('/apuntes/'+a.id+'/'));
 const items=area?[{type:'link' as const,label:area.title,href:'/apuntes/'+area.id},...breadcrumbs]:breadcrumbs;
 return <><StructuredData breadcrumbs={items}/><nav className={'theme-doc-breadcrumbs '+styles.container} aria-label="Ruta del apunte"><ul className="breadcrumbs">
  <HomeBreadcrumbItem/>
  {items.map((item,i)=>{const last=i===items.length-1;const href=item.type==='category'&&item.linkUnlisted?undefined:item.href;
   return <li key={i} className={'breadcrumbs__item'+(last?' breadcrumbs__item--active':'')}>{!last&&href?<Link className="breadcrumbs__link" to={href}>{item.label}</Link>:<span className="breadcrumbs__link">{item.label}</span>}</li>;
  })}
 </ul></nav></>;
}
