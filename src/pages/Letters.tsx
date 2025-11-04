import React from 'react'
import CardAprendizado from '../components/CardAprendizado'
import letters from '../data/letters.json'

export default function Letters() {
  return (
    <div className="p-6 grid grid-cols-4 md:grid-cols-8 gap-4">
      {letters.map((l: any) => <CardAprendizado key={l.id} item={l} />)}
    </div>
  )
}
