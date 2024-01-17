"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import CarReserve from "@/assets/assets/images/workspace/CarReserve.png";
import MyOpportunity from "@/assets/assets/images/workspace/MyOpportunity.png";
import RemoteSupport from "@/assets/assets/images/workspace/RemoteSupport.png";
import ShareDocument from "@/assets/assets/images/workspace/ShareDocument.png";
import UnderReview from "@/assets/assets/images/workspace/UnderReview.png";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { StateContext } from "@/context/Context";

const page = () => {
  const { state, setState } = useContext(StateContext);
  const router = useRouter();
  const sharedocumentRouter = () => {
    if(state.decode_token.Role==="admin"){
      router.push("/RequestList");
    }else{
      router.push("/ShareDocument");
    }
    };
  const remotesupportRouter = () => {
    router.push("/remotesupport");
  };
  const myopportunityRouter = () => {
    router.push("/myopportunity");
  };
  const carreserveRouter = () => {
    router.push("/carreserve");
  };
  const underreviewRouter = () => {
    router.push("/underreview");
  };
  const orgmbatFeature = state?.memberAuthorization?.orgmbat_feature;

  const [sharedocument, setSharedocument] = useState(false);
  const [remotesupport, setRemotesupport] = useState(false);
  const [myopportunity, setMyopportunity] = useState(false);
  const [carreserve, setCarreserve] = useState(false);
  const [underreview, setUnderreview] = useState(false);

  useEffect(() => {
    if (orgmbatFeature) {
      setSharedocument(orgmbatFeature.includes("#sharedocument"));
      setRemotesupport(orgmbatFeature.includes("#remotesupport"));
      setMyopportunity(orgmbatFeature.includes("#myopportunity"));
      setCarreserve(orgmbatFeature.includes("#carreserve"));
      setUnderreview(orgmbatFeature.includes("#underreview"));
    }
  }, [orgmbatFeature]);

  const storedLoginTime = localStorage.getItem('loginTime');
  const [loginTime, setLoginTime] = React.useState(storedLoginTime ? new Date(storedLoginTime) : new Date());

  React.useEffect(() => {
    localStorage.setItem('loginTime', loginTime);
    
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = currentTime - loginTime;
      const formattedTime = formatElapsedTime(elapsedTime);
      document.getElementById('loginPeriod').innerText = `Login Period: ${formattedTime}`;
    }, 0);

    return () => clearInterval(intervalId);
  }, [loginTime]);

  const formatElapsedTime = (elapsedTime) => {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      <div className="max-w-screen-xl p-2 lg:p-0 container mx-auto my-2 lg:my-12 flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
      <div className=" flex flex-col lg:flex-row">
          <div className="mr-3" style={{cursor:"pointer",}}>
            <Image src={Logotrac} alt="logo" priority={true} style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
          </div>
          <div className="">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
              <span style={{textTransform:"capitalize"}} className="text-lg font-semibold mr-1">
              {state.decode_token.FirstnameOriginal?state.decode_token?.FirstnameOriginal:state.decode_token?.Firstname} {state.decode_token.SurnameTokenOriginal?state.decode_token?.SurnameTokenOriginal:state.decode_token?.Surname}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.1208 6.96758L15.9168 5.17157C16.462 4.62632 16.7346 4.3537 16.8804 4.0596C17.1577 3.50005 17.1577 2.8431 16.8804 2.28354C16.7346 1.98945 16.462 1.71682 15.9168 1.17157C15.3715 0.626323 15.0989 0.353698 14.8048 0.207962C14.2452 -0.0693207 13.5883 -0.0693207 13.0287 0.207962C12.7346 0.353698 12.462 0.626323 11.9168 1.17157L10.0981 2.99023C11.062 4.64083 12.4481 6.01639 14.1208 6.96758ZM8.64365 4.44469L1.77314 11.3152C1.34808 11.7403 1.13555 11.9528 0.995818 12.2139C0.856084 12.475 0.797138 12.7697 0.679248 13.3592L0.0638519 16.4361C-0.00267025 16.7687 -0.0359313 16.9351 0.0586767 17.0297C0.153285 17.1243 0.31959 17.091 0.6522 17.0245L3.72918 16.4091C4.31863 16.2912 4.61336 16.2323 4.87446 16.0925C5.13555 15.9528 5.34808 15.7403 5.77315 15.3152L12.6625 8.42579C11.0409 7.41014 9.66919 6.04785 8.64365 4.44469Z"
                  fill="#222222"
                />
              </svg>
            </div>
            <div>
            <span className="text-lg">{state.decode_token.JobTitleOriginal?state.decode_token?.JobTitleOriginal:state.decode_token?.Role}</span>
            </div>
            <div>
            <span id="loginPeriod" className="text-lg">Login Period: 00:00:00</span>
            </div>
          </div>
        </div>
        <div className="m-2">
          <div>
            <Image
              src={state.decode_token.CompanyLogoOriginal?state.decode_token?.CompanyLogoOriginal:Logotrac}
              alt="logo"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl p-2 container mx-auto my-2 lg:my-12">
        <h3 className="my-2 lg:my-5">My work space</h3>
        <div className="flex flex-col lg:flex-row">
          <div>
            {state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature==="#securedoc" ? (
              <div
                onClick={sharedocumentRouter}
                className="font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              >
                <Image
                  src={ShareDocument}
                  alt="logo"
                  style={{ width: "70px", height: "75px" }}
                />
                <div className="my-3">
                  Secure
                  <br />
                  Doc
                </div>
              </div>
            ) : null}
          </div>

          <div>
            {remotesupport ? (
              <div
                onClick={remotesupportRouter}
                className="font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              >
                <Image
                  src={RemoteSupport}
                  alt="logo"
                  style={{ width: "70px", height: "75px" }}
                />
                <div className="my-3">
                  Under
                  <br />
                  Review
                </div>
              </div>
            ) : null}
          </div>


          <div>
            {myopportunity ? (
              <div
                onClick={myopportunityRouter}
                className="font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              >
                <Image
                  src={MyOpportunity}
                  alt="logo"
                  style={{ width: "70px", height: "75px" }}
                />
                <div className="my-3">
                  Under
                  <br />
                  Review
                </div>
              </div>
            ) : null}
          </div>

          <div>
            {carreserve ? (
              <div
                onClick={carreserveRouter}
                className="font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              >
                <Image
                  src={CarReserve}
                  alt="logo"
                  style={{ width: "70px", height: "75px" }}
                />
                <div className="my-3">
                  Under
                  <br />
                  Review
                </div>
              </div>
            ) : null}
          </div>

          <div>
            {underreview ? (
              <div
                onClick={underreviewRouter}
                className="font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              >
                <Image
                  src={UnderReview}
                  alt="logo"
                  style={{ width: "70px", height: "75px" }}
                />
                <div className="my-3">
                  Under
                  <br />
                  Review
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;