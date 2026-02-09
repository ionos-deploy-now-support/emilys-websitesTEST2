/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
  if (doc.type === 'privacy-policy') {
    return '/privacy-policy'
  }

  if (doc.type === 'portfolio') {
    return '/portfolio'
  }

  return '/'
}
