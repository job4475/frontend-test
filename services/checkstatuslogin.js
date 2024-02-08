'use client '
import { useRouter } from 'next/navigation';
import  { useEffect } from 'react'
import { useCookies } from 'react-cookie';


function Checkstatuslogin() {
  const items = JSON.parse(localStorage.getItem('decode_token'));
    console.log("🚀 ~ Checkstatuslogin ~ items:", items)
    const [cookies,] = useCookies(['token']);
    const router = useRouter();
    useEffect(() => {
      if (cookies?.token && items) {
        router.push('/Workspace');
      } else {
        router.push('/');
      }
    }, []);
  return null
}

export default Checkstatuslogin