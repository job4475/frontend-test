import Image from 'next/image'
import React from 'react'
import Logo from '@public/assets/images/email.png'
function Natty() {
  return (
    <div>
        <Image src={Logo}></Image>
    </div>
  )
}

export default Natty