'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'

function Register() {
            const {state, setState} = useContext(StateContext);
            const router = useRouter();
            const handleRegister = () => {
              setState((prevData) => ({ ...prevData,loading: true,alert: false}));
              const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
              "username": state.emailconfirm?state.emailconfirm : state.email,
              "title": state.titleselect,
              "firstname_en": state.first_name,
              "Surname_en": state.last_name,
              "mobile_phone": state.phone_number,
              "country": state.country?state.country:state.datacompanylc.Country, 
              "province": state.selectedProvince?state.selectedProvince:state.datacompanylc.Province, 
              "district": state.selectedAmphoe?state.selectedAmphoe:state.datacompanylc.District,
              "sub_district": state.selectedTambon?state.selectedTambon:state.datacompanylc.SubDistrict,
              "zipcode": state.zipcode?state.zipcode:state.datacompanylc.Zipcode,
              "create_location": state.googlemaps?state.googlemaps:state.datacompanylc.Geolocation,
              "url_logo": "unknow",
              "company_name_en": state.companyname?state.companyname:state.datacompanylc.Companyname,
              "company_mobile": state.phoneNumber?state.phoneNumber:state.datacompanylc.CompanyPhone,
              "company_alias": state.alias?state.alias:state.datacompanylc.CompanyAlias,
              "company_geolo": state.googlemaps?state.googlemaps:state.datacompanylc.Geolocation,
              "address1_en": state.street?state.street:state.datacompanylc.Address1En,
              "address_no": state.no?state.no:state.datacompanylc.AddressNo,
              "job_title": state.jobtitlename,
              "department":state.departmentname,
              "role": state.datacompanylc.AdminExists ? "user" : "admin",
              "Website":state.webSite?state.webSite:state.datacompanylc.Website,
            });
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
            const apiUrl = apiEndpoint + apiPortString + "/api/registerChicCRM";
            
            fetch(apiUrl, requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  if (result.status === "OK") {
                    setState((prevData) => ({ ...prevData, companyID: result.companyID,loading: false,alert: false }));
            const formdata = new FormData();
            formdata.append("file",  state.selectedFile);
            formdata.append("organizeID", result.companyID);
            const uploadRequestOptions = {
            method: 'PATCH',
            body: formdata,
            redirect: 'follow'
          };
          const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET;
          const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
          const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
          const apiUrl = apiEndpoint + apiPortString + "/api/uploadLogoBinary";

          fetch(apiUrl, uploadRequestOptions)
            .then(response => response.json())
            .then(uploadResult => {
              console.log(uploadResult);
              setState({ ...state, registerSuccess: true,alert: false })
            })
            .catch(uploadError => console.log('Upload error', uploadError));

      } else {
        setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error",loading: false }));         
        console.log("Status is not OK:", result.status);
      }
    })
    .catch(error => console.log('error', error));
      };
            const Selectcompany = () => {
              router.back()
            }
            const  handlechangeTitle =(e)=>{
              setState((prevData) => ({ ...prevData, titleselect: e.target.value }))
            }
            const  handlechangeinput =(e, fieldName)=>{
              setState((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
          }
          const  first_name =(e)=>{
            e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');
            setState((prevData) => ({ ...prevData, first_name: e.target.value }))
          }
          const  last_name =(e)=>{
            e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');
            setState((prevData) => ({ ...prevData, last_name: e.target.value }))
          }
          const  phone_number =(e)=>{
            e.target.value = e.target.value.replace(/\D/g, '');
            setState((prevData) => ({ ...prevData, phone_number: e.target.value }))
            
          }
            return {handlechangeTitle,handlechangeinput,Selectcompany,handleRegister,first_name,last_name,phone_number};
          }
          export default Register

