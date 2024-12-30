'use client'
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; 
import React, { useEffect } from "react";

const Notification = ({ message, visible, onClose, status }) => {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        onClose();
      }, 4000);  
        
    }
  }, [visible, onClose]);

  const backgroundColor = status === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 text-white rounded-md shadow-lg transition-all transform ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      } ${backgroundColor}`}
    >
      {message}
      <span className="pl-4 py-1">
        <FontAwesomeIcon icon={faTimes} onClick={onClose} /> 
      </span>
    </div>
  );
};

export default Notification;
