import React from 'react'
import { useTranslation } from 'react-i18next'
import CardAprendizado from '../components/CardAprendizado'
import SEO from '../components/SEO'
import numbers from '../data/numbers.json'

export default function Numbers() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('menu.numbers')}
        description={t('menu.numbers') + ' - Aprenda números interativos de forma divertida. Perfeito para crianças aprender contagem e numeração.'}
        keywords="números, contagem, educação infantil, aprender números, kids learning numbers"
        path="/numbers"
      />
      <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-3 md:p-6 auto-rows-fr">
        {numbers.map((n: any) => <CardAprendizado key={n.id} item={n} />)}
      </div>
    </>
  )
}
