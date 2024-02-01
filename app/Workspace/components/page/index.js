"use client";
import React, { useEffect, useState,useContext } from "react";
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import CarReserve from "@/assets/assets/images/workspace/CarReserve.png";
import MyOpportunity from "@/assets/assets/images/workspace/MyOpportunity.png";
import RemoteSupport from "@/assets/assets/images/workspace/RemoteSupport.png";
import ShareDocument from "@/assets/assets/images/workspace/ShareDocument.png";
import UnderReview from "@/assets/assets/images/workspace/UnderReview.png";
import { StateContext } from "@/context/Context";
import { Button, Box, Skeleton } from "@mui/material";
import Backdrop from '@/components/backdrop/backdrop' 
import { useCookies } from "react-cookie";

const Page = () => {
  const { state, setState } = useContext(StateContext);
  const [removeCookie] = useCookies(['token']);
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  const sharedocumentRouter = () => {
    setState((prevData) => ({ ...prevData, backdrop: true }));
    const redirectPath = state.decode_token.Role === "admin" ? "/RequestList" : "/ShareDocument";
    window.location.href = redirectPath;
  };

  const handleLogout = () => {
    localStorage.removeItem("ally-supports-cache");
    localStorage.removeItem("decode_token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("datacompanylc");

    removeCookie('token', { path: '/' });
    window.location.href = "/";
  };

  const formatElapsedTime = (elapsedTime) => {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const updateLoginTime = (currentTime) => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('loginTime', currentTime);
    }
  };

  useEffect(() => {
    const loginTime = isLocalStorageAvailable ? localStorage.getItem('loginTime') : null;
    const initialLoginTime = loginTime ? new Date(loginTime) : new Date();
    setLoginTime(initialLoginTime);

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = currentTime - initialLoginTime;
      const formattedTime = formatElapsedTime(elapsedTime);
      const loginPeriodElement = document.getElementById('loginPeriod');

      if (loginPeriodElement) {
        loginPeriodElement.innerText = `Login Period: ${formattedTime}`;
      } else {
        console.error("Element with id 'loginPeriod' not found in the DOM.");
      }

    }, 0);

    return () => clearInterval(intervalId);
  }, [isLocalStorageAvailable]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [setLoading]);

  const Notallowed =()=>{

  }
  return (
    <>
    <Backdrop/>
      <div className="max-w-screen-xl p-2 lg:p-0 container mx-auto my-2 lg:my-12 flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
      <div className=" flex flex-col lg:flex-row">
          <div className="mr-3" style={{cursor:"pointer",}}>
          {!loading ? (
            <Image variant="rectangular"  src={Logotrac} alt="logo"  style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
            ) : (
            <Skeleton animation="wave"  variant="rectangular"  src={Logotrac} alt="logo" style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
            )}
            </div>
          <div className="">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
            {!loading ? (
              <span style={{textTransform:"capitalize"}} className="text-lg font-semibold mr-1">
              {state.decode_token.FirstnameOriginal?state.decode_token?.FirstnameOriginal:state.decode_token?.Firstname} {state.decode_token.SurnameTokenOriginal?state.decode_token?.SurnameTokenOriginal:state.decode_token?.Surname}
              </span>
              ) : (
              <Skeleton animation="wave" height={30} width="200px" />
              )}
              <Box sx={{display:'flex',gap:'7px',ml:'10px'}}>
              {!loading ? (
                <Button disabled style={{background:'#E4E4E4',textTransform:'capitalize'}}>Edit Profile</Button>
                ) : (
                  <Skeleton width="100px" height="60px" disabled style={{background:'#E4E4E4',textTransform:'capitalize'}}/>
                  )}
                  {!loading ? (
                <Button onClick={handleclicklogout} style={{background:'#F95353',color:'#fff',borderRadius:'4px',textTransform:'capitalize'}}>Logout</Button>
                ) : (
                  <Skeleton width="80px" height="60px" disabled style={{background:'#E4E4E4',textTransform:'capitalize'}}/>
                  )}
                </Box>
            </div>
            <div>
            {!loading ? (
            <span className="text-lg">{state.decode_token.JobTitleOriginal?state.decode_token?.JobTitleOriginal:state.decode_token?.Role}</span>
            ) : (
              <Skeleton animation="wave" height={30} width="190px" />
              )}
            </div>
            <div>
            {!loading ? (
            <span id="loginPeriod" className="text-lg">Login Period: 00:00:00</span>
            ) : (
              <Skeleton animation="wave" height={30} width="180px" />
              )}
            </div>
          </div>
        </div>
        <div className="m-2">
          <div>
          {!loading ? (
            <Image
              src={state.decode_token.CompanyLogoOriginal?state.decode_token?.CompanyLogoOriginal:Logotrac}
              alt="logo"
              width={100}
              height={100}
            />
            ) : (
              <Skeleton
              src={state.decode_token.CompanyLogoOriginal?state.decode_token?.CompanyLogoOriginal:Logotrac}
              alt="logo"
              width={100}
              height={170}
            />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl p-2 container mx-auto my-2 lg:my-12">
        <h3 className="my-2 lg:my-5">My work space</h3>
        <div className="flex flex-col lg:flex-row">
          <div>
              <div
                onClick={state.memberAuthorization?.orgmbat_feature!=="#securedoc"||state.decode_token?.Role==="admin"?Notallowed:sharedocumentRouter}
                // className="font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
                className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${state.memberAuthorization?.orgmbat_feature!=="#securedoc"||state.decode_token?.Role==="admin"?"bg-gray-100":""}   ${state.memberAuthorization?.orgmbat_feature!=="#securedoc"||state.decode_token?.Role==="admin"?"":"cursor-pointer"} ${state.memberAuthorization?.orgmbat_feature!=="#securedoc"||state.decode_token?.Role==="admin"?"":"hover:bg-gray-200"} `}
              >
                <Image
                  src={ShareDocument}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:state.memberAuthorization?.orgmbat_feature!=="#securedoc"||state.decode_token?.Role==="admin"?"grayscale(1)":"" }}
                />
                <div className="my-3">
                  Secure
                  <br />
                  Doc
                </div>
              </div>
          </div>

          <div>
              <button
              role="button"
              tabIndex={0}
              onClick={Notallowed}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  Notallowed();
                }
              }}
                className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300  bg-gray-100 `}
              >
                <Image
                  src={RemoteSupport}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:"grayscale(1)" }}
                />
                <div className="my-3">
                Remote
                  <br />
                  Support
                </div>
              </button>
          </div>


          <div>
              <button
              role="button"
              tabIndex={0}
              onClick={Notallowed}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  Notallowed();
                }
              }}
                className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300  bg-gray-100 `}              >
                <Image
                  src={MyOpportunity}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:"grayscale(1)" }}/>
                <div className="my-3">
                  My
                  <br />
                  Opportunity
                </div>
              </button>
          </div>

          <div>
              <button
              role="button"
              tabIndex={0}
              onClick={Notallowed}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  Notallowed();
                }
              }}
              className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300  bg-gray-100 `}              >
                <Image
                  src={CarReserve}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:"grayscale(1)" }}/>
                <div className="my-3">
                  Car
                  <br />
                  Reserve
                </div>
              </button>
          </div>

          <div>
              <button
              role="button"
              tabIndex={0}
              onClick={handleleaderreview}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleleaderreview();
                }
              }}
                className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${(state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature!=="#securedoc")||state.decode_token?.Role==="user"?"bg-gray-100":""}   ${(state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature!=="#securedoc")||state.decode_token?.Role==="user"?"":"cursor-pointer"} ${(state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature!=="#securedoc")||state.decode_token?.Role==="user"?"":"hover:bg-gray-200"} `}
              >
                <Image
                  src={UnderReview}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:(state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature!=="#securedoc")||state.decode_token?.Role==="user"?"grayscale(1)":"" }}
                />
                <div className="my-3">
                 Under
                  <br />
                  Review
                </div>
              </button>
          </div> 
        </div>
      </div>
    </>
  );
};


export default Page;