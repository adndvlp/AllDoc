import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function DocItemMetadata(){
 const {metadata,frontMatter,assets}=useDoc();const {siteConfig}=useDocusaurusContext();
 const canonicalPath=(frontMatter as {alldoc_canonical?:unknown}).alldoc_canonical;
 const canonical=typeof canonicalPath==='string'?new URL(canonicalPath,siteConfig.url).href:undefined;
 return <PageMetadata title={metadata.title} description={metadata.description} keywords={frontMatter.keywords} image={assets.image??frontMatter.image}>
  {canonical&&<link rel="canonical" href={canonical}/>}
  {canonical&&<meta property="og:url" content={canonical}/>}
 </PageMetadata>;
}
