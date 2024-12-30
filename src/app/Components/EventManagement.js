'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteEventData, getAttendeeData, getEventData, setId, setSelectedEvent, setVisible} from "../Action"
import AddEventModel from "./AddEventModel"
import { isArray, isEmpty } from "lodash"
import DeleteModel from "./DeleteModel"
import formatDate from "../Constant"
import Notification from "./Notification"
import Loading from "./Loading"

const EventManagement=()=>{

    const dispatch = useDispatch()
    const data=useSelector((state)=>state.eventData)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token")||"";

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const selectedEvent=useSelector((state)=>state.selectedEvent)

    const message=useSelector((state)=>state.message)
    const visible=useSelector((state)=>state.visible)
    const status=useSelector((state)=>state.status)
    const loading=useSelector((state)=>state.isLoading)
    const handleCloseNotification = () => {
            dispatch(setVisible(false)); 
        };

    useEffect(() => {
        dispatch(getAttendeeData(token))
        if (token) {
            dispatch(getEventData(token));  
        }
        if (!isModalOpen) {
            dispatch(getEventData(token));  
        }
    }, [dispatch, token,isModalOpen]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        dispatch(getEventData(token))  
        dispatch(setSelectedEvent({}))
      };

    const handleEditClick=(value)=>{
        dispatch(setSelectedEvent(value))
        setIsModalOpen(true);
    }

    const handleDeleteClick=(value)=>{ 
        dispatch(setId(value.eid))
        setIsDeleteOpen(true)
    }

    const handleDeleteConfirm=()=>{
        dispatch(deleteEventData(token))
        setIsDeleteOpen(false)
    }

    return(
        <div>
            <Notification message={message} visible={visible} onClose={handleCloseNotification} status={status}/>
            <Loading isLoading={loading}/>
             <div className="p-10">
                <div className="flex justify-end">
                    <div className="px-2 py-2">
                    <button
                                onClick={() => setIsModalOpen(true)} // Open modal
                                type="button"
                                className="bg-blue-600 py-1 px-5 rounded-md text-white"
                            >
                                Add
                            </button>
                    </div>
                </div>
            <div className="relative overflow-x-auto shadow-xl sm:rounded-sm">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Event id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Event date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {!isEmpty(data) && isArray(data) ?(data.map((d, index) => (
                        <tr 
                            key={d.eid || index} 
                            className="bg-white border-b"
                        >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {d.eid}
                            </th>
                            <td className="px-6 py-4">{d.name || "-"}</td>
                            <td className="px-6 py-4">{d.description || "-"}</td>
                            <td className="px-6 py-4">{d.location || "-"}</td>
                            <td className="px-6 py-4">{!isEmpty(d.event_date)?formatDate(d.event_date) || "-" : "-"}</td>
                            <td className="px-4 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1"
                             onClick={() => handleEditClick(d)}>
                                Edit
                            </a>
                            <a href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline px-1"
                            onClick={() => handleDeleteClick(d)}>
                                Delete
                            </a>
                            </td>
                        </tr>
                        ))):<tr></tr>}

                        
                    </tbody>
                </table>
            </div>

        </div>

        

 

 
{/* Modal */}
{isModalOpen && <AddEventModel ModalOpen={handleCloseModal} event={selectedEvent}/>}
{isDeleteOpen && <DeleteModel onCancel={()=>setIsDeleteOpen(false)} onConfirm={handleDeleteConfirm}/>}

        </div>
       
    )

}
export default EventManagement