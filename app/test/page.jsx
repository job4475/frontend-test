'use client'
import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'

function page() {
  const { state, setState } = useContext(StateContext);

  return (
    <div>
          <p>test: {state.decode_token.ID}</p>
    </div>
  )
}

export default page