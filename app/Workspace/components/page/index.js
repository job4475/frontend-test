"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import CarReserve from "@/assets/assets/images/workspace/CarReserve.png";
import MyOpportunity from "@/assets/assets/images/workspace/MyOpportunity.png";
import RemoteSupport from "@/assets/assets/images/workspace/RemoteSupport.png";
import ShareDocument from "@/assets/assets/images/workspace/ShareDocument.png";
import UnderReview from "@/assets/assets/images/workspace/UnderReview.png";
import { StateContext } from "@/context/Context";
import { useRouter } from 'next/navigation';

import Backdrop from '@/components/backdrop/backdrop'
import Navbar from "@/components/navbar/navbar";
import { useCookies } from "react-cookie";


const Page = () => {
  const { state, setState } = useContext(StateContext);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cookies, removeCookie] = useCookies(['token']);

  const sharedocumentRouter = async () => {
    if (state.decode_token.JobTitleOriginal === "Manager") {
        setState({ ...state, backdrop: true });
        setTimeout(() => {
            setState((prevData) => ({ ...prevData, backdrop: false }));
        }, 1000);
        router.push('/RequestList');
    } else {
        setState({ ...state, backdrop: true });
        setTimeout(() => {
            setState((prevData) => ({ ...prevData, backdrop: false }));
        }, 1000);
        router.push('/ShareDocument');
    }    
    console.log("Router pushed successfully");
};



  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [setLoading]);

  
  const Notallowed = () => {
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
              tabIndex={0}
              onClick={!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc')||state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? Notallowed : sharedocumentRouter}
               className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "bg-gray-100" : ""}   ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "default" : "cursor-pointer"} ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc') || state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "" : "hover:bg-gray-200"} `}
              >
              <Image
                src={ShareDocument}
                alt="logo"
                style={{ width: "70px", height: "75px", filter:  !state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "grayscale(1)" : "" }}
              />
              <div className="my-3">
                Secure
                <br />
                Doc
              </div>
            </div>
          </div>

          <div>
            <div
              tabIndex={0}
              onClick={!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'RemoteSupport')||state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? Notallowed : sharedocumentRouter}
              className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'RemoteSupport')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "bg-gray-100" : ""}   ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'RemoteSupport')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "default" : "cursor-pointer"} ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'RemoteSupport') || state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "" : "hover:bg-gray-200"} `}
              >
              <Image
                src={RemoteSupport}
                alt="logo"
                style={{ width: "70px", height: "75px", filter:  !state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'RemoteSupport')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "grayscale(1)" : "" }}
              />
              <div className="my-3">
                Remote
                <br />
                Support
              </div>
            </div>
          </div>
          <div>
            <div
              tabIndex={0}
              onClick={!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'MyOpportunity')||state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? Notallowed : sharedocumentRouter}
              className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'MyOpportunity')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "bg-gray-100" : ""}   ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'MyOpportunity')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "default" : "cursor-pointer"} ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'MyOpportunity') || state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "" : "hover:bg-gray-200"} `}
              >
              <Image
                src={MyOpportunity}
                alt="logo"
                style={{ width: "70px", height: "75px", filter:  !state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'MyOpportunity')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "grayscale(1)" : "" }}/>
              <div className="my-3">
                My
                <br />
                Opportunity
              </div>
            </div>
          </div>

          <div>
            <div
              tabIndex={0}
              onClick={!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'CarReserve')||state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? Notallowed : sharedocumentRouter}
              className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'CarReserve')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "bg-gray-100" : ""}   ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'CarReserve')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "default" : "cursor-pointer"} ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'CarReserve') || state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "" : "hover:bg-gray-200"} `}
              >
              <Image
                src={CarReserve}
                alt="logo"
                style={{ width: "70px", height: "75px", filter:  !state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'CarReserve')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal === "Manager" ? "grayscale(1)" : "" }}/>
              <div className="my-3">
                Car
                <br />
                Reserve
              </div>
            </div>
          </div>

          <div>
            <div
              tabIndex={0}
              onClick={!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc')||state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal !== "Manager" ? Notallowed : sharedocumentRouter}
              className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal !== "Manager" ? "bg-gray-100" : ""}   ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal !== "Manager" ? "default" : "cursor-pointer"} ${!state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc') || state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined|| state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal !== "Manager" ? "" : "hover:bg-gray-200"} `}
              >
              <Image
                src={UnderReview}
                alt="logo"
                style={{ width: "70px", height: "75px", filter:  !state.memberAuthorization?.orgmbat_feature?.some(item => item.feature === 'securedoc')|| state.memberAuthorization?.orgmbat_feature === null || state.memberAuthorization?.orgmbat_feature === undefined||state.memberAuthorization?.orgmbat_feature?.length === 0 || state.decode_token?.JobTitleOriginal !== "Manager" ? "grayscale(1)" : "" }}/>
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