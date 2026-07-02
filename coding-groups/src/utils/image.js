const CLOUDINARY_DOMAIN = 'cloudinary.com'

const hasCloudinaryAsset = (url = '') => typeof url === 'string' && url.includes(CLOUDINARY_DOMAIN)

/**
 * Injects or replaces Cloudinary delivery transformations.
 * Target format: /upload/w_800,q_auto,f_auto/
 */
export const optimizeCloudinaryImage = (url, width = 800) => {
  if (!hasCloudinaryAsset(url) || !url.includes('/upload/')) {
    return url
  }

  const transformation = `w_${width},q_auto,f_auto`
  const [head, tail] = url.split('/upload/')

  if (!tail) {
    return url
  }

  const segments = tail.split('/')
  const firstSegment = segments[0] || ''
  const hasExistingTransform = firstSegment.includes(',') || /^[a-z]{1,4}_/i.test(firstSegment)

  if (firstSegment.startsWith('v') || firstSegment === '') {
    return `${head}/upload/${transformation}/${tail}`
  }

  if (hasExistingTransform) {
    segments[0] = transformation
    return `${head}/upload/${segments.join('/')}`
  }

  return `${head}/upload/${transformation}/${tail}`
}
