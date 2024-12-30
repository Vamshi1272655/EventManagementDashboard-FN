"use client"
import React from "react"
import UserRegister from "../Components/UserRegister"
import Notification from "../Components/Notification"
import { setVisible } from "../Action"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../Components/Loading"
 
 

const Register=()=>{

    const message=useSelector((state)=>state.message)
    const visible=useSelector((state)=>state.visible)
    const status=useSelector((state)=>state.status)
    const loading=useSelector((state)=>state.isLoading)
    const dispatch = useDispatch()
    
    const handleCloseNotification = () => {
        dispatch(setVisible(false)); 
    };
  
     
    return(
        <div>
            <Notification message={message} visible={visible} onClose={handleCloseNotification} status={status}/>
            <UserRegister/>
            <Loading isLoading={loading}/>

        </div>
    )
}

export default Register