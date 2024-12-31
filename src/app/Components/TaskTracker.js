

'use client'

import { useDispatch, useSelector } from "react-redux";
import { getAttendeeData, getEventData, getTaskData, putTaskStatus, setTaskStatus, taskDD } from "../Action";
import { useEffect, useState } from "react";
import AddTaskModel from "./AddTaskModel";
import { isArray, isEmpty } from "lodash";
import formatDate from "../Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlus, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const TaskTracker=()=>{

    const dispatch = useDispatch()
    const data=useSelector((state)=>state.taskData)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token")||"";

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleCloseModal=()=>{
        setIsModalOpen(false)
    }

    const handleStatus=(data)=>{
        dispatch(setTaskStatus({status:data.status, id:data.id}))
        dispatch(putTaskStatus(token))
    }
    

    useEffect(()=>{
        dispatch(getAttendeeData(token))
        dispatch(getEventData(token)) 
        dispatch(getTaskData(token))
        dispatch(taskDD())
    },[dispatch,token])

    return(
        <div>
            <div className="p-10">
             <div className="flex justify-end">
                <div className="px-2 py-2">
                <button
                            onClick={() => setIsModalOpen(true)} // Open modal
                            type="button"
                            className="bg-blue-600 py-1 px-3 rounded-md text-white"
                        >
                            <FontAwesomeIcon icon={faPlus} size="md" className="mr-1"/>  Add
                        </button>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-xl sm:rounded-sm">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Task Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Deadline
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Event Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Attendee Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Event Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Attendee Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {!isEmpty(data) && isArray(data)? (data.map((d, index) => (
                        <tr 
                            key={d.aid || index} 
                            className="bg-white border-b"
                        >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {d.id}
                            </th>
                            <td className="px-6 py-4">{d.taskName || "-"}</td>
                            <td className="px-6 py-4">{!isEmpty(d.deadline)?formatDate(d.deadline) || "-" : "-"}</td>
                            <td className="px-2 py-4">
                                <span
                                    className={`inline-flex items-center px-3 py-2 font-semibold text-white text-sm rounded-full ${d.status === 'PENDING' ? 'bg-yellow-400 ' : 'bg-green-400'}`}
                                >
                                    {d.status || "-"}
                                </span>
                            </td>
                            <td className="px-6 py-4">{d.eventName || "-"}</td>
                            <td className="px-6 py-4">{d.attendeeName || "-"}</td>
                            <td className="px-6 py-4">{d.eventId || "-"}</td>
                            <td className="px-6 py-4">{d.attendeeId || "-"}</td>
                            <td className="px-4 py-4">
                                {d.status==="PENDING"?<button title= "Complete" className="font-medium text-green-600 hover:underline px-5" onClick={() => handleStatus(d)}>
                                <FontAwesomeIcon icon={faCheckCircle} title="Complete" size="xl" />
                            </button>: <button className="font-medium text-red-600 hover:underline px-5" onClick={() => handleStatus(d)}>
                                <FontAwesomeIcon icon={faTimesCircle} title="Pending" size="xl" />
                            </button>}
                            
                           
                            </td>
                        </tr>
                        ))):<tr></tr>}

                        
                    </tbody>
                </table>
            </div>

            {isModalOpen && <AddTaskModel ModalOpen={handleCloseModal}/>}

        </div>
        </div>
        
    )

}
export default TaskTracker