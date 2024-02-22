'use client'
import React from 'react'

function Location (props)  {
  return (
    <iframe
    title="Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.8587671145247!2d100.57718059999999!3d13.9073888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e282584e6bd939%3A0x3ab694bb30ce43e!2sTRAC%3A%20The%20Recovery%20Advisor%20Co.%2C%20Ltd.!5e0!3m2!1sth!2sth!4v1708570336057!5m2!1sth!2sth"
    width={props.width}
    height={props.height}
    style={{border:0}}
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  />
  )
  }

export default Location
