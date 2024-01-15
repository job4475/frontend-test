'use client'
import React from 'react'
import { createContext, useState } from 'react'
import Token from '@/services/token'
import PageLoader from '@/components/pageloader'
import Alert from '@/components/alert'
import Countries from '@/services/Countries'
import Address from '@/services/Address'
export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [state, setState] = useState({ titleselect:"",last_name:"",input_email:"",role:"",selectedProvince:'',selectedAmphoe:'',selectedTambon:'',
    first_name:"",phone_number:"",job_title:"",email:'',password:'',confirmPassword:'',alias:'',province:'',companyname:'',district:''
    ,no:'',subdistric:'',street:'',zipcode:'',country:'',googlemaps:'',newpassword:'',recipient:[],showPassword:false,amphures:[],provinces:[],Tambons:[],
    info:0,input_OTP:'',datacompany:[],decode_token:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
    selectedFile:{},allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false,
    timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"",limitDateTime:false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,
    periodDays:"",periodHours:"",opensTime:"",loading:false,allorder:[],viewfile:false,viewRecipient:false,allleadorder:[],pageloader:false,alert:false,alert_text:"",alert_type:"",
    confirmlink:'',latitude:'',longitude:'',selectedImage:null,countries:[],data:[],companyID:'',referenceID:'',logoImage:'',
    });
    console.log("🚀 ~ StateProvider ~ state:", state)
    return (
        <StateContext.Provider value={{state,setState}}>
            <Countries/>
            <Address/>
            <Token/>
            <PageLoader/>
            <Alert/>
            <div>{children}</div>
        </StateContext.Provider>
    )
}
