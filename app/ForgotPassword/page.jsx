"use client";
import React from "react";
import ForgotPassword from "../ui/login/ForgotPassword/ForgotPassword";
import Image from "next/image";
import Chiclogo from "@/assets/assets/images/sigin/chiclogo.png";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const backlogin = () => {
    router.push("/Login");
  }
  if (state.decode_token !== "") {
    router.push('/Workspace');
  }

  return (
    <div className="flex flex-col xl:flex-row bg-[#F7FAFB] h-screen">
      <div className="basis-2/3 hidden xl:block">
      <Image onClick={backlogin} src={Chiclogo} alt="logo" className="absolute w-[80px] h-[auto] top-5 left-5 hover:scale-110 duration-500 cursor-pointer" />
      </div>
      <div className="my-[auto] xl:mt-[auto] basis-1/1 xl:basis-1/3 flex flex-col content-center justify-center items-center">
        <ForgotPassword />
      </div>
    </div>
  );
};

export default page;
