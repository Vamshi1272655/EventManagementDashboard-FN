
'use client'

import { useDispatch, useSelector } from "react-redux";
import { deleteAttendeeData, getAttendeeData, setId } from "../Action";
import { useEffect, useState } from "react";
import AddAttendeeModel from "./AddAttendeeModel";
import DeleteModel from "./DeleteModel";
import { isArray, isEmpty } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const AttendeeManagement=()=>{

    const dispatch = useDispatch()
    const data=useSelector((state)=>state.attendeeData)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token")||"";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const handleCloseModal=()=>{
        setIsModalOpen(false)
    }

    useEffect(()=>{
        dispatch(getAttendeeData(token))
    },[dispatch,token])
    
    const handleDeleteClick=(value)=>{ 
            dispatch(setId(value.aid))
            setIsDeleteOpen(true)
        }

    const handleDeleteConfirm=()=>{
            dispatch(deleteAttendeeData(token))
            setIsDeleteOpen(false)
        }


    return(
        <div className="p-10">
            <div className="flex justify-end">
                <div className="px-2 py-2">
                <button
                            onClick={() => setIsModalOpen(true)}  
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
                                Attendee id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {!isEmpty(data) && isArray(data)?(data.map((d, index) => (
                        <tr 
                            key={d.aid || index} 
                            className="bg-white border-b"
                        >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {d.aid}
                            </th>
                            <td className="px-6 py-4">{d.name || "-"}</td>
                            <td className="px-6 py-4">{d.email || "-"}</td>
                            <td className="px-6 py-4">{d.phone || "-"}</td>
                            <td className="px-4 py-4">
                            <a href="#" className="font-medium text-red-600 px-5"
                             onClick={() => handleDeleteClick(d)}>
                               <FontAwesomeIcon icon={faTrash} title="Delete" size="lg"/>
                            </a>
                            </td>
                        </tr>
                        ))):<tr></tr>}

                        
                    </tbody>
                </table>
            </div>

            {isModalOpen && <AddAttendeeModel ModalOpen={handleCloseModal} />}
            {isDeleteOpen && <DeleteModel onCancel={()=>setIsDeleteOpen(false)} onConfirm={handleDeleteConfirm}/>}

        </div>
    )

}
export default AttendeeManagement