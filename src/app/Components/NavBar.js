'use client'

import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { setTabval, setToken } from "../Action";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faIdCard, faTasks, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const NavBar=()=>{
   
    const dispatch=useDispatch()
    const router=useRouter()
    const tab=useSelector((state)=>state.tabval)


    const handleTab=(val)=>{
        dispatch(setTabval(val))
    }

    const handleLogout=()=>{
        dispatch(setToken(""))
        router.push("/")
    }


    return(
        <div> 

            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px justify-between">
                <li className="mr-2">
                <a
                    href="#"
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${tab === 1 ? "text-blue-600 border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`}
                    onClick={() => handleTab(1)}
                >
                    <FontAwesomeIcon icon={faCalendarAlt} size="xl" className="mr-2"/>  Event Management
                </a>
                </li>
                <li className="mr-2">
                <a
                    href="#"
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${tab === 2 ? "text-blue-600 border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`}
                    onClick={() => handleTab(2)}
                >
                    <FontAwesomeIcon icon={faIdCard} size="xl" className="mr-2"/> Attendee Management
                </a>
                </li>
                <li className="mr-2">
                <a
                    href="#"
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${tab === 3 ? "text-blue-600 border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`}
                    onClick={() => handleTab(3)}
                >
                   <FontAwesomeIcon icon={faTasks} size="xl" className="mr-2"/> Task Tracker
                </a>
                </li>
                <li className="ml-auto">
                <a
                    onClick={handleLogout}
                    className="inline-block p-4 border-b-2 rounded-t-lg hover:text-red-600 hover:border-red-300 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faUserCircle} size="xl" className="mr-2"/>  Logout
                </a>
                </li>
            </ul>
            </div>


        </div>
    )
}

export default NavBar