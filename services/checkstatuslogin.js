'use client '
import { useRouter } from 'next/navigation';
import  { useEffect } from 'react'
import { useCookies } from 'react-cookie';


function Checkstatuslogin() {
  const items = JSON.parse(localStorage.getItem('decode_token'));
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const router = useRouter();
    useEffect(() => {
        if (cookies&&cookies.token&&items ) {
          router.push ('/Workspace')
        }
        else{
          router.push('/')
        }
      }, []);
  return null
}

export default Checkstatuslogin