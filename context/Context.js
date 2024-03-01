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
import Qrcode from '@/services/qrcode'
import GetLogoBinary from '@/services/getLogoBinary'
import Timeout from '@/services/settimeout'
import Department from '@/services/department'
import Alluser from '@/services/alluser'
import AllManagerAdmin from '@/services/ManagerAdmin'
import Teamleademail from '@/services/teamleademail'
import Checkstatuslogin from '@/services/checkstatuslogin'
import Tooltiplimit from '@/services/tooltiplimit'
import Requestaccesstoken from '@/services/requestaccesstoken'
import GetuserIdforsendmessage from '@/services/GetuserIdforsendmessage'
import Addlineid from '@/services/Addlineid'
export const StateContext = createContext();
export const StateProvider = ({children}) => {
    
    const [state, setState] = useState({ titleselect:"",input_email:"",role:"",selectedProvince:'',selectedAmphoe:'',selectedTambon:'',
    first_name:"",last_name:"",phone_number:"",job_title:"",email:'',emailconfirm:'',password:'',confirmPassword:'',alias:'',province:'',companyname:'',district:''
    ,no:'',subdistric:'',street:'',zipcode:'',country:'',googlemaps:'',newpassword:'',recipient:[],showPassword:false,amphures:[],provinces:[],tambons:[],
    info:0,input_OTP:'',datacompanylc:[],datacompany:[],decode_token:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
    selectedFile:[],watermark:false,screenwatermark:false,allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttofcl:false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false,
    timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"",limitDateTime:false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,
    periodDays:"",periodHours:"",opensTime:"",loading:false,allorder:[],viewfile:false,viewRecipient:false,allleadorder:[],pageloader:false,alert:false,alert_text:"",alert_type:"",
    confirmlink:'',latitude:'',longitude:'',selectedImage:null,countries:["Thailand"],data:[],companyID:'',referenceID:'',logoImage:'',memberAuthorization:[],dragover:false,sumsize:0,size_progress:0,
    sumsize_original:0,leadAuthorization:[],memberfeature:[],securedoc:false,open:false,resetpassword:false,registerSuccess:false,qrcodeurl:'',status:'',error:false,qrcode:"",phoneNumber:'',
    passwordStrength:'',confirmpassword:"",passwordsMatch:'',backdrop:false,webSite:'',messageBody:"",timer:0,showContent:false,department:[],departmentname:'',departmentid:'',jobtitle:[],jobtitlename:'',jobtitlenid:'',userdata:[],
    checktoken:false,alluser:[],token:"",allmanageradmin:[],dialoguser:false,prepareedit:[],teamlead_email:[],additionalSelect1:'',uuid:[],tooltiplimit:false,code:'',access_token:'',user_id:''
    });
    console.log("🚀 ~ StateProvider ~ state:", state)

  
    return (
        <StateContext.Provider value={{state,setState}}>
            {/* <Countries/> */}
            {/* <Checkstatuslogin/> */}
            <GetuserIdforsendmessage/>
            <Addlineid/>
            <Requestaccesstoken/>
            <Tooltiplimit/>
            <Teamleademail/>
            <AllManagerAdmin/>
            <Alluser/>
            <Department/>
            <Timeout/>
            <GetLogoBinary/>
            <Feature/>
            <Address/>
            <PageLoader/>
            <Alert/>
            <Feature/>
            <FeatureLead/>
            <Qrcode/>
            <Token/>
            <div>{children}</div>
        </StateContext.Provider>
    )
}
