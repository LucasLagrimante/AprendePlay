import React from 'react'
import CardAprendizado from '../components/CardAprendizado'
import letters from '../data/letters.json'

export default function Letters() {
  return (
    <div className="w-full h-full grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 p-3 md:p-6 auto-rows-fr">
      {letters.map((l: any) => <CardAprendizado key={l.id} item={l} />)}
    </div>
  )
}
