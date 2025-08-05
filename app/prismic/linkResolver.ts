import { type LinkResolverFunction } from '@prismicio/client';

const linkResolver: LinkResolverFunction = (doc) => {
  const prefix = doc.lang === 'de-de' ? '' : `/${doc?.lang?.split("-")[0]}`

  switch (doc.type) {
    case 'page':
      return doc.uid === 'home' ? prefix || '/' : `${prefix}/${doc.uid}`
    default:
      return prefix || '/'
  }
}

export default linkResolver