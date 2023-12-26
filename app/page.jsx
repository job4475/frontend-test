'use client'
import { StateContext } from "@/context/Context";
import { Button } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";

export default function Home() {
  const {state, setState} = useContext(StateContext);
  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">Hello world!</h1>
      <Button>Click me</Button>
    </div>
  );
}
