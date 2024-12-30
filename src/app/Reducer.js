 

import { act } from 'react';
import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
} from './Action';
import { SET_ATTENDEE_DATA, SET_ATTENDEE_DD, SET_ATTENDEE_FORM, SET_ATTENDEE_ID, SET_EVENT_DATA, SET_EVENT_DD, SET_EVENT_FORM, SET_EVENT_ID, SET_ID, SET_LOADER, SET_LOGIN, SET_MESSAGE, SET_REGISTER, SET_SELECTED_EVENT, SET_STATUS, SET_TABVAL, SET_TASK_DATA, SET_TASK_FORM, SET_TASK_STATUS, SET_TOKEN, SET_VISIBLE } from './Constant';

const initialState = {
  isLoading:false,
  message:"",
  status:"",
  visiable:false,
  registerForm:{
    email: '',
    password: '',
    cpassword:'',
    username:''
  },
  loginForm:{
    email:"",
    password: ''
  },
  token:"",
  tabval:1,
  eventData:[],
  attendeeData:[],
  taskData:[],
  eventForm:{
    eventname: "",
    description: "",
    location: "",
    eventdate: null, 
  },
  selectedEvent:{
    eventname:"",
    eid: "",
    description: "",
    location: "",
    event_date: "", 
  },
  id:"",
  attendeeForm:{
    name:"",
    emai:"",
    phone:""
  },
  taskForm:{
    deadline:"",
    taskName:""
  },
  eventDD:[],
  attendeeDD:[],
  eventId:"",
  attendeeId:"",
  statusDetail:{}

  
};

const Reducer = (state = initialState, action) => {
  switch (action.type) { 
    case SET_REGISTER:
      return {
        ...state,
        registerForm:{
          email: action.payload.email,
          password: action.payload.password,
          cpassword: action.payload.cpassword,
          username: action.payload.username,
        },
      };
    case SET_LOADER:
      return{...state,isLoading:action.payload}
    case SET_MESSAGE:
      return{...state,message:action.payload}
    case SET_STATUS:
      return{...state,status:action.payload}
    case SET_VISIBLE:
      return{...state,visiable:action.payload}
    case SET_LOGIN:
      return{...state,
        loginForm:{
          email: action.payload.email,
          password: action.payload.password,
        },}
    case SET_TOKEN:
      return{...state,token:action.payload}
    case SET_TABVAL:
      return{...state,tabval:action.payload}
    case SET_EVENT_DATA:
      return{...state,eventData:action.payload}
    case SET_ATTENDEE_DATA:
      return{...state,attendeeData:action.payload}
    case SET_TASK_DATA:
      return{...state,taskData:action.payload}
    case SET_EVENT_FORM:
      return{...state,eventForm:{
        eventname:action.payload.eventname,
        description: action.payload.description,
        location:action.payload.location,
        eventdate: action.payload.eventdate, }}
    case SET_SELECTED_EVENT:
      return{...state,selectedEvent:{
        eid:action.payload.eid,
        eventname:action.payload.name,
        description: action.payload.description,
        location:action.payload.location,
        eventdate: action.payload.event_date, }}
    case SET_ID:
      return{...state,id:action.payload}
    case SET_ATTENDEE_FORM:
      return{...state,attendeeForm:{
        name:action.payload.name,
        email:action.payload.email,
        phone:action.payload.phone
      }}
    case SET_EVENT_DD:
      return{...state,eventDD:action.payload}
    case SET_ATTENDEE_DD:
      return{...state,attendeeDD:action.payload}
    case SET_EVENT_ID:
      return{...state,eventId:action.payload}
    case SET_ATTENDEE_ID:
      return{...state,attendeeId:action.payload}
    case SET_TASK_FORM:
      return{...state,taskForm:{
        deadline:action.payload.deadline,
        taskName:action.payload.taskName
      }}
    case SET_TASK_STATUS:
      return{...state,statusDetail:action.payload}
    default:
      return state;
  }
};

export default Reducer;
