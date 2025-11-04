import React from 'react'
import CardAprendizado from '../components/CardAprendizado'
import colors from '../data/colors.json'

export default function Colors() {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {colors.map((c: any) => <CardAprendizado key={c.id} item={c} />)}
    </div>
  )
}
