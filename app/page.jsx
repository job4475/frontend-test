'use client'
import { StateContext } from "@/context/Context";
import { Button } from "@mui/material";
import { useContext } from "react";
import Login from './Login/page'
import { useRouter } from "next/navigation";
export default function Home() {
  const {state, setState} = useContext(StateContext);
  const router = useRouter();
  // if (state.decode_token !== "") {
  //   router.push('/Workspace');
  // }
  return (
    <div>
    <Login/>
    </div>
  );
}
