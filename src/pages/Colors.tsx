import React from 'react'
import CardAprendizado from '../components/CardAprendizado'
import colors from '../data/colors.json'

export default function Colors() {
  return (
    <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-3 md:p-6 auto-rows-fr">
      {colors.map((c: any) => <CardAprendizado key={c.id} item={c} />)}
    </div>
  )
}
