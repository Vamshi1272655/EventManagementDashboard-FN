
"use client"
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react"
 
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "../Constant";
import { postUserLogin, setLogin } from "../Action";
import { isEmpty } from "lodash";

const UserLogin=()=>{

  const dispatch=useDispatch()
  const token=useSelector((state)=>state.token)
  const status=useSelector((state)=>state.status)
    

  const router=useRouter()
  const handleClick = () => {
    router.push('/register');  
  };
  const handleSubmit = (values) => {
    dispatch(setLogin(values)) 
    dispatch(postUserLogin())
  };

  useEffect(()=>{
    if(!isEmpty(token) && status==="success"){
      router.push(`/dashboard?token=${token}`);
    }
  },[status,token,router])
 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-2xl rounded-md border-2 border-gray-100 p-6" style={{width:"350px",height:"auto"}}>
        <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
         
      }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block font-bold mb-2">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              {touched.email && errors.email && <div className="text-red-500 mb-2">{errors.email}</div>}
            </div>
  
            <div>
              <label htmlFor="password" className="block font-bold mb-2">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" 
              className= "bg-blue-600 p-2 w-full rounded-md text-white"
              disabled={isSubmitting}>Login</button>
            </div>
            <div className="flex justify-center mt-1">
              <p className="text-blue-700 cursor-pointer" onClick={handleClick}>Register User?</p> 
            </div>
            
          </Form>
        )}
      </Formik>
      </div>
      
    </div>
  );

}

export default UserLogin