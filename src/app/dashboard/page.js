'use client'

import { useSelector } from "react-redux"
import NavBar from "../Components/NavBar"
import EventManagement from "../Components/EventManagement"
import AttendeeManagement from "../Components/AttendeeManagement"
import TaskTracker from "../Components/TaskTracker"

const Dashboard=()=>{

    const tabVal=useSelector((state)=>state.tabval)

    return(
        <div>
            <NavBar/>
            {tabVal===1 && <EventManagement/>}
            {tabVal===2 && <AttendeeManagement/>}
            {tabVal===3 && <TaskTracker/>}
        </div>
    )
}

export default Dashboard