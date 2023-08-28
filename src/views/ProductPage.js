import React from 'react'
import { useParams } from 'react-router'

export default function ProductPage() {
  const params = useParams();
  const {slug} = params;
  return (
    <div>
      <h1>{slug}</h1>
      
    </div>
  )
}
