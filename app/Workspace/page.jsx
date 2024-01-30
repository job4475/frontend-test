'use client'
import React, { useContext } from 'react'
import Page from './components/page'
import { StateContext } from '@/context/Context';

function App() {
  const { state, setState } = useContext(StateContext);

  return (
    <div>
    <Page />
    </div>
  )
}

export default App
