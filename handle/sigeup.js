import { useContext, useEffect } from 'react';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';

function Signup() {
    const { state, setState } = useContext(StateContext);
    const router = useRouter();

    useEffect(() => {
        const fetchLogoImage = () => {
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/getLogoBinary/${state.decode_token.CompanyID}`)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setState((prevData) => ({ ...prevData, logoImage: imageUrl }));
                })
                .catch(error => console.error("Error fetching binary data:", error));
        };
        
        fetchLogoImage();

    }, [state.email, state.decode_token.CompanyID, setState, router]);

    const handleSignUpClick = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        "username": state.email
      });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}${process.env.NEXT_PUBLIC_API_PORT_LOGIN?`:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}`:""}/api/validateDomainChicCRM`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.match === true) {
            fetchLogoImage();
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
