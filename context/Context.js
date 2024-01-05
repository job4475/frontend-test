'use client'
import React from 'react'
import { createContext, useState } from 'react'
import Token from '@/services/token'
export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [state, setState] = useState({ titleselect:"",input_last_name:"",input_email:"",input_role:"",
    input_firstName:"",input_phone:"",input_jobtitle:"",email:'',Password:'',Alias:'',Province:'',Companyname:'',District:''
    ,No:'',SubDistric:'',Street:'',ZIPCode:'',Country:'',GoogleMaps:'',Newpassword:'',recipient:[],showPassword:false,
    info:0,input_OTP:'',datacompany:[],decode_token:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
    selectedFile:{},allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false,
    timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"",limitDateTime:false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,
    periodDays:"",periodHours:"",opensTime:"",loading:false
    });
    console.log("🚀 ~ file: Context.js:10 ~ StateProvider ~ state:", state)
    return (
        <StateContext.Provider value={{state,setState}}>
            <Token/>
            <div>{children}</div>
        </StateContext.Provider>
    )
}
