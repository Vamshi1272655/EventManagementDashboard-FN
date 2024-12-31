'use client'

import { Field, Form, Formik } from "formik";
import { validationAddAttende } from "../Constant";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch} from "react-redux";
import { getAttendeeData,  postAttendeetData,setAttendeeForm } from "../Action";
 

const AddAttendeeModel = ({ ModalOpen }) => {

  
    const dispatch=useDispatch()
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token")||"";

     const handleSubmit = (values) => {
        console.log(token)
        dispatch(setAttendeeForm({...values}))
        dispatch(postAttendeetData(token));
        ModalOpen(false); 
    };
  
  useEffect(()=>{
    if(token){
        dispatch(postAttendeetData(token));
        dispatch(getAttendeeData(token))
    }
    
    
  },[dispatch,token])

   

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-hidden="true"
    >
      <div className="relative mx-4 p-4 w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Add Attendee
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
              name:"",
              email:"",
              phone:"", 
            }}
            validationSchema={validationAddAttende}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              dirty,
              isValid
            }) => (
              <Form>
                <div>
                  <label
                    htmlFor="name"
                    className="block font-bold mb-1"
                  >
                    Attendee Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 mb-4">{errors.name}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold mb-1"
                  >
                    Attendee Email
                  </label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 mb-4">{errors.email}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-bold mb-1"
                  >
                    Phone
                  </label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {touched.phone && errors.phone && (
                    <div className="text-red-500">{errors.phone}</div>
                  )}
                </div>
                <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    disabled={isSubmitting || !dirty || !isValid}
                  className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 ${isSubmitting || !dirty || !isValid ? "bg-blue-200 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
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

export default AddAttendeeModel;
