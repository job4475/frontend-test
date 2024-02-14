'use client'
import React from 'react'

function Location (props)  {
  return (
  <>
  <iframe
    title="Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.8588625160255!2d100.57718969999999!3d13.907383099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2831d7c10dcf7%3A0x47defac4e08b304e!2z4Lij4LiW4LmA4LiK4LmI4Liy4Lij4Lix4LiH4Liq4Li04LiVIOC4lOC4reC4meC5gOC4oeC4t-C4reC4hyBJUklOIENhcnJlbnRhbA!5e0!3m2!1sth!2sth!4v1707731686229!5m2!1sth!2sth"
    width={props.width}
    height={props.height}
    style={{border:0}}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
/>
  </>
  )
  }

export default Location
