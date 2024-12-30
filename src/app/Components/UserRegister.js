"use client"
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react"
import { validationRegister } from "../Constant";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { postUserRegister, setRegister, setStatus, setVisible } from "../Action";
import Notification from "./Notification";

const UserRegister=()=>{


    const dispatch = useDispatch();
    const formData=useSelector((state) => state.registerForm)
    const router=useRouter()
      const handleClick = () => {
        router.push('/');  
      };

      const handleSubmit = (values) => {
        dispatch(setRegister(values)) 
        dispatch(postUserRegister())
      };

      const mess=useSelector((state)=>state.message)
        const visiable=useSelector((state)=>state.visiable|| false)
        const status=useSelector((state)=>state.status)

        const handleCloseNotification = () => {
          dispatch(setVisible(false)); 
          if(status==="success"){
            router.push('/');
          }
        };

       

      console.log(mess,visiable,status)
        
    return(
        <div>
            <Notification message={mess} visible={visiable} onClose={handleCloseNotification} status={status}/>
            <div className="flex justify-center items-center h-screen">
             <div className="shadow-2xl rounded-md border-2 border-gray-100 p-6" style={{width:"350px",height:"auto"}}>
               <Formik
               initialValues={{username:"", email: '', password: '',cpassword:'' }}
               validationSchema={validationRegister}
               onSubmit={handleSubmit}
             >
               {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               isSubmitting,
                
             }) => (
                 <Form>
                    <div>
                     <label htmlFor="username" className="block font-bold mb-1">User Name</label>
                     <Field
                       type="text"
                       id="username"
                       name="username"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.username}
                       className="w-full p-2 border border-gray-300 rounded-md"
                     />
                     {touched.username && errors.username && <div className="text-red-500 mb-4">{errors.username}</div>}
                   </div>
                   <div>
                     <label htmlFor="email" className="block font-bold mb-1">Email</label>
                     <Field
                       type="email"
                       id="email"
                       name="email"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.email}
                       className="w-full p-2 border border-gray-300 rounded-md"
                     />
                     {touched.email && errors.email && <div className="text-red-500 mb-4">{errors.email}</div>}
                   </div>
                   <div>
                     <label htmlFor="password" className="block font-bold mb-1">Password</label>
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

                   <div>
                     <label htmlFor="cpassword" className="block font-bold mb-1">Confirm Password</label>
                     <Field
                       type="password"
                       id="cpassword"
                       name="cpassword"
                       onChange={handleChange}
                       onBlur={handleBlur}
                       value={values.cpassword}
                       className="w-full p-2 border border-gray-300 rounded-md"
                     />
                     {touched.cpassword && errors.cpassword && <div className="text-red-500">{errors.cpassword}</div>}
                   </div>

                   <div className="flex justify-center mt-6">
                     <button type="submit" 
                     className= "bg-blue-600 p-2 w-full rounded-md text-white"
                     disabled={isSubmitting}>Register</button>
                   </div>
                   <div className="flex justify-center mt-1">
                     <p className="text-blue-700 cursor-pointer" onClick={handleClick}>Login?</p> 
                   </div>
                   
                 </Form>
               )}
             </Formik>
             </div>
             
           </div>
        </div>
       
    )

}

export default UserRegister