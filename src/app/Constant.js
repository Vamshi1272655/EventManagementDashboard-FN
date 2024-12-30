import * as Yup from 'yup';

export const SET_REGISTER = "SET_REGISTER"
export const POST_USER_REGISTER="POST_USER_REGISTER"
export const SET_LOADER="SET_LOADER"
export const SET_MESSAGE = "SET_MESSAGE"
export const SET_STATUS = "SET_STATUS"
export const SET_VISIBLE = "SET_VISIBLE"
export const SET_LOGIN = "SET_LOGIN"
export const POST_USER_LOGIN = "POST_USER_LOGIN"
export const SET_TOKEN = "SET_TOKEN"
export const SET_TABVAL="SET_TABVAL"
export const GET_EVENT_DATA="GET_EVENT_DATA"
export const SET_EVENT_DATA = "SET_EVENT_DATA"
export const GET_ATTENDEE_DATA = "GET_ATTENDEE_DATA"
export const SET_ATTENDEE_DATA = "SET_ATTENDEE_DATA"
export const GET_TASK_DATA = "GET_TASK_DATA"
export const SET_TASK_DATA = "SET_TASK_DATA"
export const PUT_EVENT_DATA = "PUT_EVENT_DATA"
export const POST_EVENT_DATA = "POST_EVENT_DATA"
export const SET_EVENT_FORM = "SET_EVENT_FORM"
export const SET_SELECTED_EVENT = "SET_SELECTED_EVENT"
export const UPDATE_EVENT_DATA = "UPDATE_EVENT_DATA"
export const DELETE_EVENT_DATA = "DELETE_EVENT_DATA"
export const SET_ID = 'SET_ID'
export const SET_ATTENDEE_FORM = "SET_ATTENDEE_FORM"
export const POST_ATTENDEE_DATA = "POST_ATTENDEE_DATA"
export const DELETE_ATTENDEE_DATA = "DELETE_ATTENDEE_DATA"
export const SET_EVENT_DD = "SET_EVENT_DD"
export const TASK_DD ="TASK_DD"
export const SET_ATTENDEE_DD = "SET_ATTENDEE_DD"
export const SET_EVENT_ID="SET_EVENT_ID"
export const SET_ATTENDEE_ID = "SET_ATTENDEE_ID"
export const SET_TASK_FORM = "SET_TASK_FORM"
export const POST_TASK_DATA = "POST_TASK_DATA"
export const SET_TASK_STATUS = "SET_TASK_STATUS"
export const PUT_TASK_STATUS = "PUT_TASK_STATUS"
 


const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/
;

export const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(passwordRegex, 'Password must be at least 6 characters and contain both letters and numbers')
      .required('Password is required'),
  });

  export const validationRegister = Yup.object({
    username:Yup.string()
    .required('User Name is required')
    .min(4,"User Name should have at least 4 characters"),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(passwordRegex, 'Password must be at least 6 characters and contain both letters and numbers')
      .required('Password is required'),
    cpassword:Yup.string()
      .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
      .matches(passwordRegex, 'Confrim Password must be at least 6 characters and contain both letters and numbers')
      .required('Confrim Password is required'),
  });

  export const validationAddEvent = Yup.object({
    eventname:Yup.string()
    .required('event name is required')
    .min(4,"event name should have at least 4 characters"),
    description: Yup.string()
    .required('description is required')
    .min(4,"description should have at least 4 characters"),
    location: Yup.string()
    .required('location is required')
    .min(4,"location should have at least 4 characters"),
    eventdate: Yup.date()
    .required("Event date is required")
    .min(new Date(), "Event date cannot be in the past"),
  });

  export const validationAddAttende = Yup.object({
    name:Yup.string()
    .required('name is required')
    .min(4,"name should have at least 4 characters"),
    email: Yup.string()
    .matches(emailRegex, 'Invalid email address')
    .required('Email is required'),
    phone: Yup.string()
    .required('phone is required')
    .min(10,"phone should have at have 10 number")
    .max(10,"phone should have at have 10 number"),
  });

  export const validationAddTask = Yup.object({
    taskName:Yup.string()
    .required("task name required")
    .min(4,"task name should have at least 4 characters"),
    deadline: Yup.date()
    .required("deadline date is required")
    .min(new Date(), "deadline date cannot be in the past"),
  })

    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12 || 12; 
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';
  
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds} ${period}`;
    
    return formattedDate;
  };
  export default formatDate