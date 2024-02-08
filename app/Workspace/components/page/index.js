"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import CarReserve from "@/assets/assets/images/workspace/CarReserve.png";
import MyOpportunity from "@/assets/assets/images/workspace/MyOpportunity.png";
import RemoteSupport from "@/assets/assets/images/workspace/RemoteSupport.png";
import ShareDocument from "@/assets/assets/images/workspace/ShareDocument.png";
import UnderReview from "@/assets/assets/images/workspace/UnderReview.png";
import { StateContext } from "@/context/Context";

import Backdrop from '@/components/backdrop/backdrop'
import Navbar from "@/components/navbar/navbar";
import { useCookies } from "react-cookie";


const Page = () => {
  const { state, setState } = useContext(StateContext);
  const [loading, setLoading] = useState(true);
  const [cookies, removeCookie] = useCookies(['token']);

  const sharedocumentRouter = () => {
    setState((prevData) => ({ ...prevData, backdrop: true }));
    if (state.decode_token.Role === "admin") {
      window.location.href = "/RequestList"
    } else {
      window.location.href = "/ShareDocument"
    }
  };


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [setLoading]);

  
  const Notallowed = () => {

  }

  const handlesharedoc = () => {
    state.memberAuthorization?.orgmbat_feature !== "#securedoc" || state.decode_token?.Role === "admin" ? Notallowed() : sharedocumentRouter()
  }


  return (
    <>
      <Backdrop />
      <Navbar />


      <div className="max-w-screen-xl p-2 container mx-auto my-2 lg:my-12">
        <h3 className="my-2 lg:my-5">My work space</h3>
        <div className="flex flex-col lg:flex-row">
          <div>
            <div
              role="button"
              tabIndex={0}
              onClick={handlesharedoc}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlesharedoc();
                }
              }}
              // className="font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
              className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${state.memberAuthorization?.orgmbat_feature !== "#securedoc" || state.decode_token?.Role === "admin" ? "bg-gray-100" : ""}   ${state.memberAuthorization?.orgmbat_feature !== "#securedoc" || state.decode_token?.Role === "admin" ? "" : "cursor-pointer"} ${state.memberAuthorization?.orgmbat_feature !== "#securedoc" || state.decode_token?.Role === "admin" ? "" : "hover:bg-gray-200"} `}
            >
              <Image
                src={ShareDocument}
                alt="logo"
                style={{ width: "70px", height: "75px", filter: state.memberAuthorization?.orgmbat_feature !== "#securedoc" || state.decode_token?.Role === "admin" ? "grayscale(1)" : "" }}
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
                style={{ width: "70px", height: "75px", filter: "grayscale(1)" }}
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
                style={{ width: "70px", height: "75px", filter: "grayscale(1)" }} />
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
                style={{ width: "70px", height: "75px", filter: "grayscale(1)" }} />
              <div className="my-3">
                Car
                <br />
                Reserve
              </div>
            </button>
          </div>

          <div>
            <div
              role="button"
              tabIndex={0}
              onClick={sharedocumentRouter}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sharedocumentRouter();
                }
              }}
              className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${(state.memberAuthorization?.orgmbat_feature || state.leadAuthorization?.orgmbat_feature !== "#securedoc") || state.decode_token?.Role === "user" ? "bg-gray-100" : ""}   ${(state.memberAuthorization?.orgmbat_feature || state.leadAuthorization?.orgmbat_feature !== "#securedoc") || state.decode_token?.Role === "user" ? "" : "cursor-pointer"} ${(state.memberAuthorization?.orgmbat_feature || state.leadAuthorization?.orgmbat_feature !== "#securedoc") || state.decode_token?.Role === "user" ? "" : "hover:bg-gray-200"} `}
            >
              <Image
                src={UnderReview}
                alt="logo"
                style={{ width: "70px", height: "75px", filter: state.decode_token?.Role === "user" ? "grayscale(1)" : "" }}
              />
              <div className="my-3">
                Under
                <br />
                Review
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;