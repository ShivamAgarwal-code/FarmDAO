import Image from 'next/image'
import React from 'react'
import badge from "./Badge.png"
interface BTProps {
  imgURL: string
  title: string
  hash: string
  product: string
  quantity: string
}

const BadgeTile: React.FC<BTProps> = ({  title, hash, product,quantity }) => {
  return (
    <div className="flex h-[200] bg-gray-100 max-w-[350px] flex-col rounded  shadow">
      <Image
        src={badge}
        alt="Badge Img"
        width={300}
        min-width={220}
        height={200}
        className="rounded-sm"
      />
      <div className="pt-1 text-center font-raj text-lg font-bold">{title}</div>
      <div className="text-center font-raj text-lg font-bold">
        Transaction Hash: #{hash}
      </div>
      <div className="text-center font-raj text-lg font-bold">
        Land Location: {product}
      </div>
      <div className="text-center font-raj text-lg font-bold">
        Area (in Acres): {quantity}
      </div>
    </div>
  )
}

export default BadgeTile;