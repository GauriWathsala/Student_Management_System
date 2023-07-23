import React from 'react'
import { useLocation } from 'react-router-dom'

export const Back = ({title,}) => {
    const location = useLocation()
  return (
    <>
        <section className='back'>
            <h2>Home / {location.pathname.split("/")[1]}</h2>
            <h1>{title}</h1>
        </section>
        <section>
          <div className='marigin'></div>
        </section>
    </>
  )
}

export default Back
