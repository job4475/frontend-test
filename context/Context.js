'use client'
import React from 'react'
import { createContext, useState } from 'react'
export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [state, setState] = useState({ recipient:[]});

    return (
        <StateContext.Provider value={{state,setState}}>
            <div>{children}</div>
        </StateContext.Provider>
    )
}
