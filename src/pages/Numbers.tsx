import React from 'react'
import CardAprendizado from '../components/CardAprendizado'
import numbers from '../data/numbers.json'

export default function Numbers() {
  return (
    <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-3 md:p-6 auto-rows-fr">
      {numbers.map((n: any) => <CardAprendizado key={n.id} item={n} />)}
    </div>
  )
}
