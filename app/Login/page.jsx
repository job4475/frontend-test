import React, { useContext, useEffect } from "react";
import LoginForm from "../ui/login/LoginForm/LoginForm";
import Image from "next/image";
import Chiclogo from "@/assets/assets/images/sigin/chiclogo.png";
import { StateContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const Page = () => {
  const { state } = useContext(StateContext);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();

  const backToLogin = () => {
    window.location.href="/"
  };

  useEffect(() => {
    if (cookies&&cookies.token) {
      router.push('/Workspace');
    }
  }, []);

  return (
    <div className="flex flex-col xl:flex-row bg-[#F7FAFB] h-screen">
      <div className="basis-2/3 hidden xl:block">
        <Image
          onClick={backToLogin}
          src={Chiclogo}
          alt="logo"
          className="absolute w-[80px] h-[auto] top-5 left-5 hover:scale-110 duration-500 cursor-pointer"
        />
      </div>
      <div className="my-[auto] xl:mt-[auto] basis-1/1 xl:basis-1/3 flex flex-col content-center justify-center items-center transition duration-150 hover:ease-in">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
