'use client'
import LoginForm from "../ui/login/LoginForm/LoginForm";
import Image from "next/image";
import Chiclogo from "@/assets/assets/images/sigin/chiclogo.png";
import { Box, Skeleton } from "@mui/material";
import { StateContext } from "@/context/Context";
import React,{ useContext, useEffect } from "react";

const Page = () => {
  const {state, setState} = useContext(StateContext);
  const backToLogin = () => {
    window.location.href="/"
  };
  useEffect(() => {
    const timer = setTimeout(() => {setState({ ...state, showContent: true });}, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col xl:flex-row bg-[#F7FAFB] h-screen">
      <div className="basis-2/3 hidden xl:block">
        {state.showContent?(
          <Image onClick={backToLogin}src={Chiclogo}alt="logo"className="absolute w-[80px] h-[auto] top-5 left-5 hover:scale-110 duration-500 cursor-pointer"/>
        ):(
          <Box m={3}>
            <Skeleton variant="circular" width={100} height={100} />
          </Box> 
        )}
      </div>
      <div className="my-[auto] xl:mt-[auto] basis-1/1 xl:basis-1/3 flex flex-col content-center justify-center items-center transition duration-150 hover:ease-in">
        <LoginForm />
      </div>
    </div>
  );
};
export default Page;
