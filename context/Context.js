'use client'
import React from 'react'
import { createContext, useState } from 'react'
import Token from '@/services/token'
export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [state, setState] = useState({ titleselect:"",input_last_name:"",input_email:"",input_role:"",
    input_firstName:"",input_phone:"",input_jobtitle:"",Email:'',Password:'',Alias:'',Province:'',Companyname:'',District:''
    ,No:'',SubDistric:'',Street:'',ZIPCode:'',Country:'',GoogleMaps:'',Newpassword:'',recipient:[],showPassword:false,
    info:0,input_OTP:'',datacompany:[],decode_token:[]});
    console.log("🚀 ~ file: Context.js:11 ~ StateProvider ~ state:", state)
    return (
        <StateContext.Provider value={{state,setState}}>
            <Token/>
            <div>{children}</div>
        </StateContext.Provider>
    )
}
