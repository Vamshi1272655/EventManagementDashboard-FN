'use client'

import { Field, Form, Formik } from "formik";
import { validationAddEvent } from "../Constant";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'; // Importing date-fns for date formatting
import { useDispatch, useSelector} from "react-redux";
import { getEventData, postEventData, setEventForm,updateEventData} from "../Action";
 

const AddEventModel = ({ ModalOpen, event }) => {

    const dispatch=useDispatch()
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token")||"";

     const handleSubmit = (values) => {
        const formattedDate = format(new Date(values.eventdate), "yyyy-MM-dd'T'HH:mm:ss");
        if (event.eid>0) {
            dispatch(setEventForm({...values, eventdate: formattedDate}))
            dispatch(updateEventData(token));
        } else {
            dispatch(setEventForm({...values, eventdate: formattedDate}))
            dispatch(postEventData(token));
        }
        ModalOpen(false);
        dispatch(getEventData(token));  
    };
  
  useEffect(()=>{
      dispatch(postEventData(token))
      dispatch(getEventData(token))
    
  },[dispatch,token])

  const minTime = new Date();
  minTime.setHours(1); // 1:00 AM
  minTime.setMinutes(0);

  const maxTime = new Date();
  maxTime.setHours(23); // 11:00 PM
  maxTime.setMinutes(0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-hidden="true"
    >
      <div className="relative mx-4 p-4 w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {event ? "Edit Event" : "Add Event"}
          </h3>
          <button
            onClick={() => ModalOpen(false)} // Close modal
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <Formik
            initialValues={{
              eventname: event?event.eventname:"",
              description: event?event.description:"",
              location: event?event.location:"",
              eventdate: event?event.eventdate:null,  
            }}
            validationSchema={validationAddEvent}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              isSubmitting,
              dirty
            }) => (
              <Form>
                <div>
                  <label
                    htmlFor="eventname"
                    className="block font-bold mb-1"
                  >
                    Event Name
                  </label>
                  <Field
                    type="text"
                    id="eventname"
                    name="eventname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.eventname}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {touched.eventname && errors.eventname && (
                    <div className="text-red-500 mb-4">{errors.eventname}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block font-bold mb-1"
                  >
                    Description
                  </label>
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {touched.description && errors.description && (
                    <div className="text-red-500 mb-4">{errors.description}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block font-bold mb-1"
                  >
                    Location
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {touched.location && errors.location && (
                    <div className="text-red-500">{errors.location}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="eventdate"
                    className="block font-bold mb-2"
                  >
                    Event Date
                  </label>
                  <DatePicker
                    id="eventdate"
                    selected={values.eventdate}
                    onChange={(date) => setFieldValue("eventdate", date)} // Store as Date object
                    showTimeSelect
                    minTime={minTime}
                    maxTime={maxTime}
                    minDate={new Date()} // Disable past dates
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select date and time"
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {touched.eventdate && errors.eventdate && (
                    <div className="text-red-500 mt-1">{errors.eventdate}</div>
                  )}
                </div>
                <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => ModalOpen(false)} // Close modal
                    type="button"
                    className="ml-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg py-2.5 px-5 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddEventModel;
