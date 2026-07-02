import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { GOOGLE_SITE_VERIFICATION, SITE_URL, toAbsoluteUrl } from '../config/site'

const DEFAULT_TITLE = 'CodingGroups | Web Development Studio'
const DEFAULT_DESCRIPTION = 'We build fast, modern websites and online stores that drive results.'
const DEFAULT_OG_DESCRIPTION = 'We build modern websites that grow your business.'
const DEFAULT_KEYWORDS = 'web development, websites, online stores, Nigeria'
const DEFAULT_OG_IMAGE = '/assets/preview-image.png'

const SEO = ({
  title,
  description,
  keywords,
  image = DEFAULT_OG_IMAGE,
  url = '',
  type = 'website',
  noIndex = false,
}) => {
  const location = useLocation()

  const fullTitle = title ? `${title} | CodingGroups` : DEFAULT_TITLE
  const metaDescription = description || DEFAULT_DESCRIPTION
  const metaKeywords = keywords || DEFAULT_KEYWORDS
  const metaImage = toAbsoluteUrl(image)
  const pagePath = url || location.pathname
  const metaUrl = toAbsoluteUrl(pagePath)

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="CodingGroups" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || DEFAULT_OG_DESCRIPTION} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="CodingGroups" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || DEFAULT_OG_DESCRIPTION} />
      <meta name="twitter:image" content={metaImage} />

      <link rel="canonical" href={metaUrl} />

      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      {GOOGLE_SITE_VERIFICATION ? (
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      ) : null}

      <meta property="og:locale" content="en_US" />
      <meta name="application-name" content="CodingGroups" />
      <meta name="theme-color" content="#0F172A" />
      <meta name="url" content={SITE_URL} />
    </Helmet>
  )
}

export default SEO
