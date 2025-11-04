import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  image?: string
  path?: string
}

const SITE_NAME = 'AprendePlay'
const SITE_URL = 'https://lucaslagrimante.github.io/AprendePlay'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`
const SUPPORTED_LANGS = ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'zh']

export default function SEO({ title, description, keywords = '', image = DEFAULT_IMAGE, path = '' }: SEOProps) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language.split('-')[0] // Extrai 'pt' de 'pt-BR'

  // Construir URL canônica
  const canonicalUrl = path ? `${SITE_URL}${path}` : SITE_URL

  // Gerar tags hreflang para todos os idiomas suportados
  const generateHreflangs = () => {
    return SUPPORTED_LANGS.map((lang) => ({
      rel: 'alternate',
      hrefLang: lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : lang,
      href: `${SITE_URL}${path}?lang=${lang}`,
    }))
  }

  // Traduzir título para incluir nome do site
  const fullTitle = `${title} | ${SITE_NAME}`

  return (
    <Helmet>
      {/* Tags Básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Lucas Lagrimante" />
      <meta name="charset" content="UTF-8" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Language Alternates (hreflang) */}
      {generateHreflangs().map((hreflang) => (
        <link key={hreflang.hrefLang} rel={hreflang.rel} hrefLang={hreflang.hrefLang} href={hreflang.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph - Facebook, LinkedIn, etc. */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={currentLang === 'pt' ? 'pt_BR' : currentLang === 'es' ? 'es_ES' : currentLang} />

      {/* Alternative locale versions for Open Graph */}
      {SUPPORTED_LANGS.filter((lang) => lang !== currentLang).map((lang) => (
        <meta
          key={`og-locale-${lang}`}
          property="og:locale:alternate"
          content={lang === 'pt' ? 'pt_BR' : lang === 'es' ? 'es_ES' : lang}
        />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@lucaslagrimante" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FF6B6B" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  )
}
