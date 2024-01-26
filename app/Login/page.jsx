"use client"
import React from "react";
import LoginForm from "../ui/login/LoginForm/LoginForm";
import Image from "next/image";
import Chiclogo from "@/assets/assets/images/sigin/chiclogo.png";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const page = () => {

  const router = useRouter();

  const backlogin = () => {
    router.push("/Login");
  }

  return (
    <div className="flex flex-col xl:flex-row bg-[#F7FAFB] h-screen">
      <div className="basis-2/3 hidden xl:block ">
        <Image onClick={backlogin} src={Chiclogo} alt="logo" className="absolute w-[80px] h-[auto] top-5 left-5 hover:scale-110 duration-500 cursor-pointer" />
      </div>
      <div className="my-[auto] xl:mt-[auto] basis-1/1 xl:basis-1/3 flex flex-col content-center justify-center items-center transition duration-150 hover:ease-in">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
