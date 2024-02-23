'use client'

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import { Button } from '@mui/material';

function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [ fileUploaded, setFileUploaded ] = useState(false);
    const [file,setfile] = useState(null);
    const [loading,setloading] = useState(false);

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error),
      accessType: 'offline', // เพิ่มบรรทัดนี้เพื่อร้องขอสิทธิ์ในการอัปโหลดไฟล์ไปยัง Google Drive
      scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata' // เพิ่มสิทธิ์ในการอัปโหลดไฟล์ไปยัง Google Drive
  });
  

    useEffect(
        () => {
            if (user) {
                console.log("🚀 ~ App ~ user:", user)
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const uploadFileToDrive = async () => {
        setloading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", file ? file[0].type:"");
        myHeaders.append("Authorization", `Bearer ${user.access_token}`);
        
        const files = file ? file[0]:"";
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: files,
          redirect: "follow"
        };
        
        fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", requestOptions)
          .then((response) => response.json())
          .then((result) => 
          {
            Rename(result.id)
          })
          .catch((error) => console.error(error));
    };

    const Rename =(id)=>{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${user.access_token}`);
      
      const raw = JSON.stringify({
        "title": file ? file[0].name:""
      });
      
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      fetch(`https://www.googleapis.com/drive/v2/files/${id?id:""}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("🚀 ~ .then ~ result:", result)
          alert("Upload Successfully")
          setloading(false)
        })
        .catch((error) => console.error(error));
    }

    const logOut = () => {
        googleLogout();
        setProfile(null);
        setFileUploaded(false);
    };

    return (
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
            <h2>Upload files to Google drive</h2>
            <br />
            <br />
            {profile ? (
                <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                    <Image width={100} height={100} src={profile?.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    {!fileUploaded && (
                      <div style={{display:"flex",justifyContent:"center",flexDirection:"row",alignItems:"center"}}>
                        <input type='file' onChange={(e)=>{setfile(e.target.files)}}></input>
                        <Button variant='contained' onClick={uploadFileToDrive}>{loading?"Loading...":"Upload File to Drive"}</Button>
                        </div>
                    )}
                    <br />
                    <br />
                    <Button variant='contained' color="error" onClick={logOut}>Log out</Button>
                </div>
            ) : (
                <Button variant='contained' color="success" onClick={login}>Sign in with Google 🚀 </Button>
            )}
        </div>
    );
}
export default App;
