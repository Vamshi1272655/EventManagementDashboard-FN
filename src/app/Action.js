import { DELETE_ATTENDEE_DATA, DELETE_EVENT_DATA, GET_ATTENDEE_DATA, GET_EVENT_DATA, GET_TASK_DATA, POST_ATTENDEE_DATA, POST_EVENT_DATA, POST_TASK_DATA, POST_USER_LOGIN, POST_USER_REGISTER, PUT_EVENT_DATA, PUT_TASK_STATUS, SET_ATTENDEE_DATA, SET_ATTENDEE_DD, SET_ATTENDEE_FORM, SET_ATTENDEE_ID, SET_EVENT, SET_EVENT_DATA, SET_EVENT_DD, SET_EVENT_FORM, SET_EVENT_ID, SET_ID, SET_LOADER, SET_LOGIN, SET_MESSAGE, SET_REGISTER, SET_SELECTED_EVENT, SET_STATUS, SET_TABVAL, SET_TASK_DATA, SET_TASK_FORM, SET_TASK_STATUS, SET_TOKEN, SET_VISIBLE, TASK_DD, UPDATE_EVENT_DATA } from "./Constant";

 

export const SET_USER_DATA = 'SET_USER_DATA';
export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';

 
export const fetchUserDataRequest = () => ({
  type: FETCH_USER_DATA_REQUEST,
});

export const fetchUserDataSuccess = (data) => ({
  type: FETCH_USER_DATA_SUCCESS,
  payload: data,
});

export const fetchUserDataFailure = (error) => ({
  type: FETCH_USER_DATA_FAILURE,
  payload: error,
});

export const setRegister=(data)=>({
    type:SET_REGISTER,
    payload:data
})

export const setLogin=(data)=>({
  type:SET_LOGIN,
  payload:data
})

export const postUserRegister=()=>({
    type:POST_USER_REGISTER
})

export const postUserLogin=()=>({
  type:POST_USER_LOGIN
})
  
export const setLoader = (value) => ({
    type:SET_LOADER,
    payload:value
});

export const setMessage=(value)=>({
    type:SET_MESSAGE,
    payload:value
})

export const setStatus=(value)=>({
    type:SET_STATUS,
    payload:value
})

export const setVisible=(value)=>({
    type:SET_VISIBLE,
    payload:value
})

export const setToken=(value)=>({
  type:SET_TOKEN,
  payload:value
})

export const setTabval=(value)=>({
  type:SET_TABVAL,
  payload:value
})

export const getEventData=(token)=>({
  type:GET_EVENT_DATA,
  payload: { token }
})

export const setEventData=(value)=>({
  type:SET_EVENT_DATA,
  payload:value
})

export const getAttendeeData=(token)=>({
  type:GET_ATTENDEE_DATA,
  payload: { token }
})

export const setAttendeeData=(value)=>({
  type:SET_ATTENDEE_DATA,
  payload:value
})

export const getTaskData=(token)=>({
  type:GET_TASK_DATA,
  payload: { token }
})

export const setTaskData=(value)=>({
  type:SET_TASK_DATA,
  payload:value
})

export const putEventData=(token)=>({
  type:PUT_EVENT_DATA,
  payload: { token }
})

export const postEventData=(token)=>({
  type:POST_EVENT_DATA,
  payload: { token }
})

export const postAttendeetData=(token)=>({
  type:POST_ATTENDEE_DATA,
  payload: { token }
})

export const postTaskData=(token)=>({
  type:POST_TASK_DATA,
  payload: { token }
})

export const setEventForm=(data)=>({
  type:SET_EVENT_FORM,
  payload:data
})

export const setAttendeeForm=(data)=>({
  type:SET_ATTENDEE_FORM,
  payload:data
})

export const setTaskForm=(data)=>({
  type:SET_TASK_FORM,
  payload:data
})

export const setSelectedEvent=(data)=>({
  type:SET_SELECTED_EVENT,
  payload:data
})

export const updateEventData=(token)=>({
  type:UPDATE_EVENT_DATA,
  payload: { token }
})

export const deleteEventData=(token)=>({
  type:DELETE_EVENT_DATA,
  payload: {token}
})

export const deleteAttendeeData=(token)=>({
  type:DELETE_ATTENDEE_DATA,
  payload: {token}
})

export const taskDD=()=>({
  type:TASK_DD,
   
})

export const setId=(id)=>({
  type:SET_ID,
  payload:id
})

export const setEventId=(id)=>({
  type:SET_EVENT_ID,
  payload:id
})

export const setAttendeeId=(id)=>({
  type:SET_ATTENDEE_ID,
  payload:id
})

export const setEventDD=(data)=>({
  type:SET_EVENT_DD,
  payload:data
})

export const setAttendeeDD=(data)=>({
  type:SET_ATTENDEE_DD,
  payload:data
})

export const setTaskStatus=(data)=>({
  type:SET_TASK_STATUS,
  payload:data
})

export const putTaskStatus=(token)=>({
  type:PUT_TASK_STATUS,
  payload:{token}
})
 

  