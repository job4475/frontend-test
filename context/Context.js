'use client'
import React from 'react'
import { createContext, useState } from 'react'
export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [state, setState] = useState({ titleselect:"",input_last_name:"",input_email:"",input_role:"",
    input_firstName:"",input_phone:"",input_jobtitle:"",Email:'',Password:'',Alias:'',Province:'',Companyname:'',District:''
    ,No:'',SubDistric:'',Street:'',ZIPCode:'',Country:'',GoogleMaps:'',Newpassword:'',recipient:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
    selectedFile:{},allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false,
    timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"",limitDateTime:false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,
    periodDays:"",periodHours:"",opensTime:""
    });
    console.log("🚀 ~ file: Context.js:10 ~ StateProvider ~ state:", state)

    return (
        <StateContext.Provider value={{state,setState}}>
            <div>{children}</div>
        </StateContext.Provider>
    )
}
