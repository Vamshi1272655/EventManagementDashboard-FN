'use client'

import React from "react"
import UserLogin from "./Components/UserLogin"
import Notification from "./Components/Notification";
import { useSelector } from "react-redux";
import { setVisible } from "./Action";
import Loading from "./Components/Loading";
 
 


export default function Home() {

  const message=useSelector((state)=>state.message)
  const visible=useSelector((state)=>state.visible)
  const status=useSelector((state)=>state.status)
  const loading=useSelector((state)=>state.isLoading)
  const handleCloseNotification = () => {
    setVisible(false); 
  };
  
 
  return (
    <div>
      <Notification message={message} visible={visible} onClose={handleCloseNotification} status={status}/>
      <UserLogin/>
      <Loading isLoading={loading}/>
    </div>
  );
}
