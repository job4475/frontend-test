'use client'
import { StateContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

function Managerlist() {
  const {state, setState} = useContext(StateContext);

    const router = useRouter();
    const handleNewRequest = ()=>{
        router.push('/ShareDocument');
    }

    const handleBatchApprove = async (managerIDs,  departmentIDs) => {
      setState((prevData) => ({ ...prevData, pageloader: true}));
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${state.token}`);

      const raw = JSON.stringify({
        "departmentID": departmentIDs,
        "managerID": managerIDs,
        "action": "Active"
      });
      // Make the log request after all files have been fetched
      const logRequestOptions = {
        method: 'PATCH',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
      };
    
      try {
        const logResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/GivePermissionManager`, logRequestOptions);
        const logResult = await logResponse.json();
        console.log("🚀 ~ handleBatchApprove ~ logResult:", logResult)
    
        if (logResult.status === 'OK') {
          setState((prevData) => ({ ...prevData, alert: true, pageloader: false, alert_text: "Operation successfully", alert_type: "success" }));
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${state.token}`);
          
          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
          };

          const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
          const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
          const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getManagerAdminDashboard`;
          fetch(apiUrl, requestOptions)
         
            .then((response) => response.json())
            .then((result) => 
            {
              setState((prevData) => ({ ...prevData, allmanageradmin: result }));
            })
            .catch((error) => console.error(error));
        }else{
          setState((prevData) => ({ ...prevData, alert: true, loading: false, alert_text: "Operation failed", alert_type: "error" }));
        }
      } catch (logError) {
        console.log('Error sending log request:', logError);
      }
    };

    const handleClicktoApprove = (user) => {
      // console.log("🚀 ~ handleClicktoApprove ~ user:", user)
      const managerIDs = user.managerID;
      const departmentIDs = user.departmentID;
      
    
      handleBatchApprove(managerIDs, departmentIDs);
    };


    const handleReject = (user)=>{
      setState((prevData) => ({ ...prevData, pageloader: true}));
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${state.token}`);
      
      const raw = JSON.stringify({
        "departmentID": user.departmentID,
        "managerID": user.managerID,
        "action": "Disabled"
      });
      
      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/GivePermissionManager`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 'OK') {
            setState((prevData) => ({ ...prevData, alert: true, pageloader: false, alert_text: "Operation successfully", alert_type: "success" }));
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${state.token}`);
            
            const requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow"
            };
  
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiUrl = `${apiEndpoint}:${apiPortLogin}/api/getManagerAdminDashboard`;
            fetch(apiUrl, requestOptions)
           
              .then((response) => response.json())
              .then((result) => 
              {
                setState((prevData) => ({ ...prevData, allmanageradmin: result }));
              })
              .catch((error) => console.error(error));
          }else{
            setState((prevData) => ({ ...prevData, alert: true, loading: false, alert_text: "Operation failed", alert_type: "error" }));
          }
        }
        )
        .catch((error) => console.error(error));
    }


  return {handleNewRequest,handleClicktoApprove,handleReject};}

export default Managerlist

