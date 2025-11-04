import React from 'react'
import { useTranslation } from 'react-i18next'
import CardAprendizado from '../components/CardAprendizado'
import SEO from '../components/SEO'
import letters from '../data/letters.json'

export default function Letters() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('menu.letters')}
        description={t('menu.letters') + ' - Aprenda o alfabeto interativo em ' + letters.length + ' letras diferentes. Perfeito para crianças aprender as letras.'}
        keywords="alfabeto, letras, aprender letras, educação infantil, abc, abcedário"
        path="/letters"
      />
      <div className="w-full h-full grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 p-3 md:p-6 auto-rows-fr">
        {letters.map((l: any) => <CardAprendizado key={l.id} item={l} />)}
      </div>
    </>
  )
}
