'use client'
import React from 'react'
import { createContext, useState } from 'react'
import Token from '@/services/token'
import PageLoader from '@/components/pageloader'
import Alert from '@/components/alert'
import Countries from '@/services/Countries'
import Address from '@/services/Address'
import Feature from '@/services/feature'
import FeatureLead from '@/services/featurelead'
import AlertDialog   from '@/handle/dialog'
import Loading from  '@/components/loading'
import Qrcode from '@/services/qrcode'
export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [state, setState] = useState({ titleselect:"",last_name:"",input_email:"",role:"",selectedProvince:'',selectedAmphoe:'',selectedTambon:'',
    first_name:"",phone_number:"",job_title:"",email:'',password:'',confirmPassword:'',alias:'',province:'',companyname:'',district:''
    ,no:'',subdistric:'',street:'',zipcode:'',country:'',googlemaps:'',newpassword:'',recipient:[],showPassword:false,amphures:[],provinces:[],Tambons:[],
    info:0,input_OTP:'',datacompany:[],decode_token:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
    selectedFile:[],allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttofcl:false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false,
    timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"",limitDateTime:false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,
    periodDays:"",periodHours:"",opensTime:"",loading:false,allorder:[],viewfile:false,viewRecipient:false,allleadorder:[],pageloader:false,alert:false,alert_text:"",alert_type:"",
    confirmlink:'',latitude:'',longitude:'',selectedImage:null,countries:[],data:[],companyID:'',referenceID:'',logoImage:'',memberAuthorization:[],dragover:false,sumsize:0,size_progress:0,
    sumsize_original:0,leadAuthorization:[],periodDays:"",periodHours:"",opensTime:"",loading:false,confirmlink:'',latitude:'',longitude:'',selectedImage:null,countries:[],data:[],companyID:'',referenceID:'',logoImage:'',memberfeature:[],securedoc:false,
    open:false,resetpassword:false,loading:false,registerSuccess:false,qrcodeurl:'',phonecompany:'',Website:'',status:'',message:'',error:false,qrcode:"",
    passwordStrength:'',confirmpassword:"",passwordsMatch:''
    });
    console.log("🚀 ~ StateProvider ~ state:", state)
    return (
        <StateContext.Provider value={{state,setState}}>
            <Countries/>
            <Loading/>
            <AlertDialog/>
            <Feature/>
            <Address/>
            <Token/>
            <PageLoader/>
            <Alert/>
            <Feature/>
            <FeatureLead/>
            <Qrcode/>
            <div>{children}</div>
        </StateContext.Provider>
    )
}
