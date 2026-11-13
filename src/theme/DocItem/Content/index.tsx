import type {ReactNode} from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type {Props} from '@theme/DocItem/Content';
import {getConcept} from '@site/src/content/concepts';
import FavoriteButton, {LibrarySaveStatus} from '@site/src/components/FavoriteButton';
import styles from './styles.module.css';

// Conserva el título sintético de Docusaurus y su único bloque MDX.
export default function DocItemContent({children}: Props): ReactNode {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const title = !frontMatter.hide_title && typeof contentTitle === 'undefined' ? metadata.title : null;
  const concept = getConcept(metadata.id);
  return <div className={`${ThemeClassNames.docs.docMarkdown} markdown`}>
    {title && <header className={concept ? styles.title : undefined}>
      <Heading as="h1">{title}</Heading>
      {concept && <><FavoriteButton conceptId={concept.id} /><LibrarySaveStatus className={styles.feedback} /></>}
    </header>}
    <MDXContent>{children}</MDXContent>
  </div>;
}
