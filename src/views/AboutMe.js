import React from 'react'
import { Outlet } from 'react-router'

export default function AboutMe() {
  return (
    <div className='about-container'>
      <h1> WIP </h1>
      <div className='about-me'>
        <p>I'm just a weeb who started buying stuff in hopes to keep some and sell stuff I end up not using.</p>
        <p>Email me at: dummyemail@email.com</p>
      </div>
      <Outlet/>
    </div>
  )
}
