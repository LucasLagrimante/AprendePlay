import React from 'react'
import CardAprendizado from '../components/CardAprendizado'
import numbers from '../data/numbers.json'

export default function Numbers() {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {numbers.map((n: any) => <CardAprendizado key={n.id} item={n} />)}
    </div>
  )
}
