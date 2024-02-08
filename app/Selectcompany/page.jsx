"use client"
import React, { useContext } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { StateContext } from "@/context/Context";
import Backdrop from '@/components/backdrop/backdrop'

const Page = () => {

  const router = useRouter();
  const { state, setState } = useContext(StateContext);
  const Register = () => {
    setState({
      ...state,
      datacompany: state.datacompanylc,
      companyID: state.datacompanylc.CompanyID,
      companyname: state.datacompanylc.Companyname,
      alias: state.datacompanylc.CompanyAlias,
      no: state.datacompanylc.AddressNo,
      street: state.datacompanylc.Address1En,
      googlemaps: state.datacompanylc.Geolocation,
      selectedProvince: state.datacompanylc.Province,
      selectedAmphoe: state.datacompanylc.District,
      selectedTambon: state.datacompanylc.SubDistrict,
      zipcode: state.datacompanylc.Zipcode,
      country: state.datacompanylc.Country,
      webSite:state.datacompanylc.Website,
      backdrop: false,
      loading: false
    });
    router.push('/Register');
  }
  const CreateCompany = () => {
    setState({ ...state, backdrop: true });
    setTimeout(() => {
      setState((prevData) => ({ ...prevData, backdrop: false }));
    }, 1000);
    window.location.href="/CreateCompany"
  }
  return (
    <div
      className="h-screen"
      style={{
        background: `linear-gradient(108deg, #84BAA1 0%, #FFFBE2 100%), #F7FAFB`,
      }}
    >
      {state.backdrop ? <Backdrop /> : ""}
      <div className="bg-white h-screen w-4/5 p-16">
        <h2>Hi, Is this the company you work ?</h2>
        <p>Please select your company.</p>
        <div className="flex lg:flex-row flex-col items-center content-center">
          <Box onClick={Register} sx={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer", transition: "background-color 0.3s ease", "&:hover": { backgroundColor: "#f4f9f6" } }} className="basis-2/6 rounded-[10px] border border-[#C2CCE1] w-[300px] h-[370px] mr-3 mt-2 lg:mt-4 flex flex-col  items-center py-[42px] px-[40px] text-center" >
            <Box sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)' } }}>
              <Image
                src={state.datacompanylc?.CompanyLogo}
                alt="logo"
                width={90}
                height={90}
              />
            </Box>
            <div>
              <h4>{state.datacompanylc?.Companyname}</h4>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="4"
                viewBox="0 0 52 4"
                fill="none"
              >
                <path
                  d="M2 2H50"
                  stroke="#9FDBD6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-[500]">
                {state.datacompanylc?.Companyname} {state.datacompanylc?.Province}, {state.datacompanylc?.Zipcode} {state.datacompanylc?.Country}.
              </p>
            </div>
          </Box>

          <Box onClick={CreateCompany} sx={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer", transition: "background-color 0.3s ease", "&:hover": { backgroundColor: "#f4f9f6" } }} className="basis-2/6 rounded-[10px] border border-[#C2CCE1] w-[250px] h-[370px] mr-3 mt-2 lg:mt-4 flex flex-col  items-center py-[42px] px-[40px] text-center" >
            <Box sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.3)' }}}>
              <Box sx={{ width: '90px', height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                >
                  <path
                    d="M19.9167 3V38"
                    stroke="#84BAA1"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 20.5L38 20.5"
                    stroke="#84BAA1"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </Box>
            </Box>
            <div>
              <h4>Add new your company</h4>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="4"
                viewBox="0 0 52 4"
                fill="none"
              >
                <path
                  d="M2 2H50"
                  stroke="#9FDBD6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-[500]">
                For users who do not have a company listed in the options.
              </p>
            </div>
          </Box>

        </div>
      </div>
    </div>
  );
};

export default Page;