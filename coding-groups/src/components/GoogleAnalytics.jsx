import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { GA_MEASUREMENT_ID } from '../config/site'

const GoogleAnalytics = () => {
  const location = useLocation()
  const gaId = GA_MEASUREMENT_ID

  useEffect(() => {
    if (!gaId || gaId === 'G-XXXXXXXXXX' || !window.gtag) {
      return
    }

    window.gtag('config', gaId, {
      page_path: location.pathname + location.search,
    })
  }, [gaId, location.pathname, location.search])

  if (!gaId || gaId === 'G-XXXXXXXXXX') {
    return null
  }

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </script>
    </Helmet>
  )
}

export default GoogleAnalytics
