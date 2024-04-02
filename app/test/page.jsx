"use client";
import React, { useState } from 'react'
import Arrow from '@mui/icons-material/KeyboardArrowLeftRounded';
import Profile from '@mui/icons-material/AccountCircleRounded';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CastRoundedIcon from '@mui/icons-material/CastRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const Sidebar = ({
  children,
})=> {
  const [open, setOpen] = useState(true);
  const [navmobile, setnavmobile] = useState(true);

  const Menus = [
    { mainmenu: "Home" },
    { mainmenu: "Notification", icon: <NotificationsNoneOutlinedIcon /> },
    { mainmenu: "Administrator", icon: <AdminPanelSettingsOutlinedIcon /> },
    { mainmenu: "Setting", icon: <SettingsOutlinedIcon /> },
    { mainmenu: "Social Connect", icon: <HubOutlinedIcon /> },
  ];

  const workSpaceMenu = [
    { mainmenu: "Share Documents" },
    { mainmenu: "MyOpportunity", icon: <SignalCellularAltRoundedIcon /> },
    { mainmenu: "Under Review", icon: <TaskAltRoundedIcon /> },
    { mainmenu: "Remote Support", icon: <CastRoundedIcon /> },
  ];


  return (
    <div className='flex bg-[#f8fafc]'>
      <div className={` bg-[#fff] h-screen px-4 py-6 duration-100 ${navmobile ? "max-sm:hidden" : "visible"} ${open ? "w-64" : "w-20"}`}>
        <Arrow sx={{ fontSize: '35px' }} className={`text-[#000] absolute -right-9 top-1/2 cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
        <div className='inline-flex'>
          <Profile sx={{ fontSize: '40px' }} className={`rounded-full block float-left mr-2 cursor-pointer`} />
          <div className={`flex-col ${!open && "scale-0"}`}>
            <h1 className={`text-[14px] origin-left font-semibold`}>Name Surname</h1>
            <p className={`text-[12px] origin-left font-semibold`}>Job title</p>
          </div>
        </div>
        <div className={`flex mt-3 ${!open && "scale-0"}`}>
          <p className={`text-[10px] text-[#] font-medium uppercase`}>menu</p>
        </div>
        <ul>
          {Menus.map((menu, index) => (
            <>
              <li key={index} className='text-[#1F2939] rounded-md text-sm font-medium flex items-center gap-x-3 cursor-pointer px-2 py-2.5 mt-1 hover:bg-[#1F2939] hover:text-[#fff] has-[:checked]:bg-indigo-50'>
                <span className='block float-left '>
                  {menu.icon ? menu.icon : <SpaceDashboardOutlinedIcon />}
                </span>
                <span className={`${!open && "hidden"}`}>
                  {menu.mainmenu}
                </span>
              </li>
            </>
          ))}
        </ul >
        <div className={`flex mt-5 ${!open && "scale-0"}`}>
          <p className={`text-[10px] text-[#] font-medium uppercase`}>work space</p>
        </div>
        <ul>
          {workSpaceMenu.map((menu, index) => (
            <>
              <li key={index} className='text-[#1F2939] rounded-md text-sm font-medium flex items-center gap-x-3 cursor-pointer px-2 py-2.5 mt-1 hover:bg-[#1F2939] hover:text-[#fff]'>
                <span className='block float-left'>
                  {menu.icon ? menu.icon : <PostAddOutlinedIcon />}
                </span>
                <span className={`${!open && "hidden"}`}>
                  {menu.mainmenu}
                </span>
              </li>
            </>
          ))}
        </ul >
      </div>
      <div className="w-[100%] mx-auto px-4 py-4">

      <div className='bg-[#fff] w-auto rounded-md h-16 flex items-center p-7'>
        <div className={` sm:hidden `} onClick={() => setnavmobile(!navmobile)}>
          <MenuRoundedIcon sx={{ width: '35px', height: 'auto', cursor: 'pointer' }} />
        </div>
        
      </div>

      <div className='bg-[#fff] mt-4 h-screen w-auto rounded-md p-7'>
        {children}
      </div>

      </div>
    </div>
  )
}

export default Sidebar