'use client'
import { useRouter } from "next/navigation";

function Managerlist() {
    const router = useRouter();
    const handleNewRequest = ()=>{
        router.push('/ShareDocument');
    }


  return {handleNewRequest};}

export default Managerlist

