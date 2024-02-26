'use client'
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Userlist() {
  const {state, setState} = useContext(StateContext);
  const router = useRouter();
  const [ user, setUser ] = useState([]);
  const [ file,setfile ] = useState([]);
  const [ filetype,setfiletype ] = useState([]);
  const [ filegg2,setfilegg2 ] = useState([]);
  console.log("🚀 ~ Userlist ~ filegg2:", filegg2)
  const [ filetypegg2,setfiletypegg2 ] = useState([]);
  const [ filetype2,setfiletype2 ] = useState([]);
  const [ filename2,setfilename2 ] = useState([]);
  const [ uuid,setuuid ] = useState([]);
  const [ filetypegg,setfiletypegg ] = useState([]);
  const [ filenamegg,setfilenamegg ] = useState([]);
  const [ uuidgg,setuuidgg ] = useState([]);
  const [ filesecuretypegg,setfilesecuretypegg ] = useState([]);
  const [ recipient,setrecipient ] = useState([]);
  const [ recipient2,setrecipient2 ] = useState([]);
  const [ msgEmail,setmsgEmail ] = useState([]);
  const [ msgEmail2,setmsgEmail2 ] = useState([]);

    const handleNewRequest =async () => {
      setState({ ...state, backdrop: true });
        setTimeout(() => {
          setState((prevData) => ({ ...prevData, backdrop: false }));
      }, 1000);
      await router.push('/ShareDocument');
    };
    
    
      const handleTooltipOpen = () => {
          setState((prevData) => ({ ...prevData, viewfile: !state.viewfile}));
      };
      const handleTooltipClose = () => {
        setState((prevData) => ({ ...prevData, viewfile: false}));
      };
      const handleTooltipOpenRecipient = () => {
        setState((prevData) => ({ ...prevData, viewRecipient: !state.viewRecipient}));
      };
      const handleTooltipCloseRecipient = () => {
        setState((prevData) => ({ ...prevData, viewRecipient: false}));
      };

      const handleClicktoGetFile = (uuid) => {
        const requestOptions = {
          method: 'GET',
          responseType: 'blob',
          redirect: 'follow'
        };
    
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
        const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
        const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
        const apiUrl = `${apiEndpoint}${apiPortString}/api/requestFile/${uuid}`;

        fetch(apiUrl, requestOptions)
          .then(response => response.blob())
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
    
            window.open(blobUrl, '_blank');
          })
          .catch(error => console.log('error', error));
      };

      const handleExportToDevice = (uuids, filenames,securetype) => {
        setState(prevData => ({...prevData,backdrop: true}));
        const promises = uuids.map((uuid, index) => {
            const requestOptions = {
                method: 'GET',
                responseType: 'blob',
                redirect: 'follow'
            };
    
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
            const apiUrl = `${apiEndpoint}${apiPortString}/api/requestFile/${uuid}`;
    
            // ส่งคำขอดาวน์โหลดไฟล์
            return fetch(apiUrl, requestOptions)
                .then(response => response.blob())
                .then(blob => {
                    // สร้างลิงก์ชั่วคราวสำหรับไฟล์
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    // กำหนดชื่อไฟล์สำหรับการดาวน์โหลด
                    const filename = filenames[index] || `file_${uuid}.extension`;
                    link.download = filename+`${securetype[index]==="HTML"?".html":".FCL"}`;
                    // เพิ่มลิงก์ไปยัง DOM และเรียกใช้การดาวน์โหลด
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                });
        });
    
        Promise.all(promises)
            .then(() => {
              setState(prevData => ({...prevData,backdrop: false}));
            })
            .catch(error => console.log('Error downloading files:', error));
    };

    const handleExportToDevice2 = (uuids, filenames, securetype) => {
      setuuid(prevFiles => [...prevFiles, { uuid: uuids}]);
      setfilename2(prevFiles => [...prevFiles,  filenames]);
      setfiletype2(prevFiles => [...prevFiles,  securetype]);
  };

  const handleExportToGoogleDrive2 = (uuids, filenames,type,securetype,recipients,massageEmail) => {
       setuuidgg(prevFiles => [...prevFiles, { uuid: uuids}]);
       setfilenamegg(prevFiles => [...prevFiles,  filenames]);
       setfilesecuretypegg(prevFiles => [...prevFiles,  securetype]);
       setfiletypegg(prevFiles => [...prevFiles,  type]);
       setrecipient2(prevFiles => [...prevFiles,  recipients]);
       setmsgEmail2(prevFiles => [...prevFiles,  massageEmail]);
  }


  useEffect(() => {
    if(uuid.length>0){
      setState(prevData => ({...prevData,backdrop: true}));
      const promises = uuid.map((id, index) => {
      const requestOptions = {
        method: 'GET',
        responseType: 'blob',
        redirect: 'follow'
    };

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
    const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
    const apiUrl = `${apiEndpoint}${apiPortString}/api/requestFile/${id.uuid}`;

    // ส่งคำขอดาวน์โหลดไฟล์
    return fetch(apiUrl, requestOptions)
        .then(response => response.blob())
        .then(blob => {
            // สร้างลิงก์ชั่วคราวสำหรับไฟล์
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            // กำหนดชื่อไฟล์สำหรับการดาวน์โหลด
            const filename = filename2[index] || `file_${id.uuid}.extension`;
            link.download = filename+`${filetype2[index]==="HTML"?".html":".FCL"}`;
            // เพิ่มลิงก์ไปยัง DOM และเรียกใช้การดาวน์โหลด
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        });
    });

    Promise.all(promises)
        .then(() => {
            console.log('All files downloaded successfully');
        })
        .catch(error => console.log('Error downloading files:', error));
      }
}, [uuid]);

useEffect(() => {
  if(uuidgg.length > 0 && user.length > 0){
    setState(prevData => ({...prevData, backdrop: true}));
    const filePromises = uuidgg.map((id, index) => {
      const requestOptions = {
        method: 'GET',
        responseType: 'blob',
        redirect: 'follow'
      };

      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
      const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
      const apiUrl = `${apiEndpoint}${apiPortString}/api/requestFile/${id.uuid}`;

      return fetch(apiUrl, requestOptions)
        .then(response => response.blob())
        .then(blob => {
          const filename = filenamegg[index] + (filesecuretypegg[index] === "HTML" ? ".html" : ".FCL") || `file_${id.uuid}.extension`;
          return { name: filename, blob: blob };
        })
        .catch(error => {
          console.error('Error downloading file:', error);
          return { error: error };
        });
    });

    Promise.all(filePromises)
      .then(files => {
        const successfulFiles = files.filter(file => !file.error);
        setfiletypegg2(filetypegg);
        setfilegg2(prevFiles => [...prevFiles, ...successfulFiles]);
        console.log('All files downloaded successfully');
      })
      .catch(error => console.error('Error downloading files:', error));
  }
}, [uuidgg, user]);

  

      const handleExportToGoogleDrive = (uuids, filenames,type,securetype,recipients,massageEmail) => {
        setfile([])
        setrecipient(recipients)
        setmsgEmail(massageEmail)
        const promises = uuids.map((uuid, index) => {
            // สร้างคำขอดาวน์โหลดไฟล์สำหรับ UUID นี้
            const requestOptions = {
                method: 'GET',
                responseType: 'blob',
                redirect: 'follow'
            };
    
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
            const apiPortLogin = process.env.NEXT_PUBLIC_API_PORT_LOGIN || "";
            const apiPortString = apiPortLogin ? `:${apiPortLogin}` : "";
            const apiUrl = `${apiEndpoint}${apiPortString}/api/requestFile/${uuid}`;
    
            // ส่งคำขอดาวน์โหลดไฟล์
            return fetch(apiUrl, requestOptions)
                .then(response => response.blob())
                .then(blob => {
                    // สร้างลิงก์ชั่วคราวสำหรับไฟล์
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    // กำหนดชื่อไฟล์สำหรับการดาวน์โหลด
                    const filename = filenames[index]+`${securetype[index]==="HTML"?".html":".FCL"}` || `file_${uuid}.extension`;
                    setfiletype(type)
                    setfile(prevFiles => [...prevFiles, { name: filename, blob: blob }]);
                });
        });
    
        // รอให้การดาวน์โหลดสำเร็จทั้งหมด
        Promise.all(promises)
            .then(() => {
                console.log('All files downloaded successfully');
            })
            .catch(error => console.log('Error downloading files:', error));
    };
    

      const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 500,
          borderRadius: 7,
          border: '1px solid rgba(119, 130, 150, 0.20)',
          background: '#FFF',
          boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.08)',
        },
      });
      const CustomTooltipRecipient = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 500,
          borderRadius: 7,
          border: '1px solid rgba(119, 130, 150, 0.20)',
          background: '#FFF',
          boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.08)',
        },
      });
      
      const convertTimestampToLocalTime = (timestamp) => {

        const utcDate = new Date(timestamp * 1000);
        const localDate = new Intl.DateTimeFormat('th-TH', {
          timeZone: 'Asia/Bangkok',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        }).formatToParts(utcDate);
    
        const formattedDate = `${localDate[0].value}/${localDate[2].value}/${localDate[4].value}`;
        const formattedTime = `${localDate[6].value}:${localDate[8].value}:${localDate[10].value}`;
      
        return `${formattedDate} ${formattedTime}`;
      };

      const groupedOrders = state.allorder?.reduce((acc, item) => {
        const existingOrder = acc.find((group) => group[0]?.scdact_reqid === item.scdact_reqid);
      
        if (existingOrder) {
          existingOrder.push(item);
        } else {
          acc.push([item]);
        }
      
        return acc;
      }, []);

      const handleGoogleDrive =(row) => {
        console.log("🚀 ~ handleGoogleDrive ~ row:", row)
      }

      const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser([codeResponse]),
        onError: (error) => console.log('Login Failed:', error),
        accessType: 'offline',
        scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata' // เพิ่มสิทธิ์ในการอัปโหลดไฟล์ไปยัง Google Drive
      });
    

      useEffect(() => {
        if (user.length > 0 && (file.length > 0||filegg2.length > 0)) {
            const access_token = user[0].access_token;
            const filesToUse = file.length > 0 ? file : filegg2;
            const fileTypesToUse = filetype.length > 0 ? filetype : filetypegg2;

            
            const promises = filesToUse.map((fileItem, index) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", fileTypesToUse[index]);
                myHeaders.append("Authorization", `Bearer ${access_token}`);
                
                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: fileItem.blob,
                    redirect: "follow"
                };
                
                return fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        return Rename(result.id, fileItem.name);
                    })
                    .catch(error => console.error(error));
            });
    
            Promise.all(promises)
                .then(() => {
                    
                  })
                .catch(error => console.error("Error uploading files:", error));
        }
    }, [user,file ,filegg2]);
    
    const Rename = (id, filename) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${user[0].access_token}`);
        
        const raw = JSON.stringify({
            title: filename
        });
        
        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(`https://www.googleapis.com/drive/v2/files/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              AssigntoRecipients(result.id)
            })
            .catch(error => console.error(error));
    };
    useEffect(() => {
      if(user.length > 0){
        setState(prevData => ({...prevData,backdrop: true}));
      }
    }, [user,setUser])
    

    const AssigntoRecipients = (id) => {
      const access_token = user[0].access_token;
      
      // แยก Recipient และ messageEmail ออกจากกัน
      const recipients = recipient.length > 0 ? recipient[0].split(",") : recipient2[0].split(",");
      const messageEmails = msgEmail.length > 0 ? msgEmail[0].split(",") : msgEmail2[0].split(",");
      
      // สร้าง Promise สำหรับแต่ละ Recipient
      const requests = recipients.map((recipient, index) => {
        console.log("🚀 ~ requests ~ recipient:", recipient)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${access_token}`);
    
        const raw = JSON.stringify({
          "role": "reader",
          "type": "user",
          "emailAddress": recipient.trim() 
        });
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
    
        // ส่งคำขอ API สำหรับแต่ละ Recipient
        return fetch(`https://www.googleapis.com/drive/v3/files/${id}/permissions?sendNotificationEmails=true&emailMessage=${messageEmails}`, requestOptions);
      });
    
      // รวม Promise ของแต่ละ Recipient เข้าด้วยกัน
      Promise.all(requests)
        .then(responses => {
          return Promise.all(responses.map(response => response.json()));
        })
        .then(results => {
          // ล้างข้อมูลหลังจากทำงานเสร็จสำเร็จ
          setState(prevData => ({...prevData,alert: true,alert_text: "Upload to Google Drive Successfully",alert_type: "success",loading: false,backdrop:false}));
                    setTimeout(() => {
                      setState((prevData) => ({ ...prevData, alert: false }));
                    }, 2000);
          setfilesecuretypegg([]);
          setuuidgg([]);
          setfiletypegg([]);
          setfilenamegg([]);
          setuuid([]);
          setfilename2([]);
          setfiletype2([]);
          setfiletypegg2([]);
          setfilegg2([]);
          setfiletype([]);
          setfile([]);
          setUser([]);
          setrecipient([]);
          setrecipient2([]);
          setmsgEmail([]);
          setmsgEmail2([]);
        })
        .catch(error => console.error(error));
    }
    
    
    


  return {handleNewRequest,handleClicktoGetFile,handleTooltipOpen,handleTooltipClose,handleTooltipCloseRecipient,handleTooltipOpenRecipient,CustomTooltip,CustomTooltipRecipient,
    convertTimestampToLocalTime,groupedOrders,login,handleGoogleDrive,handleExportToDevice,handleExportToDevice2,handleExportToGoogleDrive,handleExportToGoogleDrive2
  };

}

export default Userlist

