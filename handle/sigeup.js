import { useContext, useEffect } from 'react';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';

function Signup() {
    const { state, setState } = useContext(StateContext);
    const router = useRouter();

    const handleSignUpClick = () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        "username": state.email
      });
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_GET || "";
      const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN ? `:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}` : "";
      const apiUrl = apiEndpoint + apiPortLogin + "/api/validateDomainChicCRM";

      fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.match === true) {
            setState({
              ...state,
              datacompany: result.data,
              companyID: result.data.CompanyID,
              companyname: result.data.Companyname,
              alias: result.data.CompanyAlias,
              no: result.data.AddressNo,
              street: result.data.Address1En,
              googlemaps: result.data.Geolocation,
              province: result.data.Province,
              district: result.data.District,
              subdistric: result.data.SubDistrict,
              zipcode: result.data.Zipcode,
              country: result.data.Country
            });
            router.push('/Selectcompany');
          } else if (result.message === "username already exists"){
            setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
          }
        })
        .catch(error => console.log('error', error));
  };

    return { handleSignUpClick };
}

export default Signup;
