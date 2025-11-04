import React from 'react'
import { useTranslation } from 'react-i18next'
import CardAprendizado from '../components/CardAprendizado'
import SEO from '../components/SEO'
import colors from '../data/colors.json'

export default function Colors() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('menu.colors')}
        description={t('menu.colors') + ' - Aprenda cores interativamente com ' + colors.length + ' cores diferentes. Jogo educativo para crianças aprender sobre cores.'}
        keywords="cores, colors, educação infantil, aprender cores, kids learning colors, rainbow"
        path="/colors"
      />
      <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-3 md:p-6 auto-rows-fr">
        {colors.map((c: any) => <CardAprendizado key={c.id} item={c} />)}
      </div>
    </>
  )
}
