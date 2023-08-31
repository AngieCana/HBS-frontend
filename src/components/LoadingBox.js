import React from 'react'
import Spinner from "react-bootstrap/Spinner"

export default function LoadingBox() {
  return (
    <div>
      <Spinner animation="border" role="statux">
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  )
}
