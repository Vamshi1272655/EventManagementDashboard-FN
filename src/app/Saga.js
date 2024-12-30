// sagas.js

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setLoader, setStatus, setMessage, setVisible, setToken, getEventData, setEventData, getAttendeeData, setAttendeeData, getTaskData, setTaskData, setEventDD, setAttendeeDD } from './Action';
import { DELETE_ATTENDEE_DATA, DELETE_EVENT_DATA, GET_ATTENDEE_DATA, GET_EVENT_DATA, GET_TASK_DATA, POST_ATTENDEE_DATA, POST_EVENT_DATA, POST_TASK_DATA, POST_USER_LOGIN, POST_USER_REGISTER, PUT_TASK_STATUS, TASK_DD, UPDATE_EVENT_DATA } from './Constant';
import { deleteAttendee, deleteEvent, fetchAttendeeData, fetchEventData, fetchTaskData, MapperDD, postAttendee, postEvent, postTask, putTask, updateEvent, UserLoginToken, userRegister } from './mapper';
import { isEmpty } from 'lodash';
 

 
function* postUserRegister(){
    yield put (setLoader(true))
    const form=yield select(((state) => state.registerForm))
    const username=form.username
    const password=form.password
    const email=form.email
    const res=yield call(userRegister,email,password,username)
    yield put(setMessage(res.message))
    yield put(setStatus(res.status))
    yield put(setVisible(true))
    yield put (setLoader(false))
}

function* postUserLogin(){
  yield put (setLoader(true))
  const form=yield select(((state) => state.loginForm))
  const password=form.password
  const email=form.email
  const res=yield call(UserLoginToken,email,password)
  yield put (setToken(res.data))
  yield put(getEventData(res.data))
  yield put(getAttendeeData(res.data))
  yield put(getTaskData(res.data))
  yield put(setMessage(res.message))
  yield put(setStatus(res.status))
  yield put(setVisible(true))
  yield put (setLoader(false))
}

function* getEventDetails(action){
  const res=yield call(fetchEventData,action.payload.token)
  yield put(setEventData(res))
}

function* getAttendeeDetails(action){
  const res=yield call(fetchAttendeeData,action.payload.token)
  yield put(setAttendeeData(res))
}

function* getTaskDetails(action){
  const res=yield call(fetchTaskData,action.payload.token)
  yield put(setTaskData(res))
   
}

function* postEventDetails(action) {
  const token = action.payload.token;
  if (!isEmpty(token)) {
    const eventForm = yield select((state) => state.eventForm);
 
    const res = yield call(
      postEvent,
      eventForm.eventname,
      eventForm.eventdate,
      eventForm.description,
      eventForm.location,
      token
    );
    yield put(setVisible(true));
  }
    yield put(getEventData(token))
    
}

function* updateEventDetails(action){
  const token = action.payload.token;
  
  if (!isEmpty(token)) {
    const editForm = yield select((state) => state.selectedEvent)
    const eventForm = yield select((state) => state.eventForm)
    const id=editForm.eid
    const res = yield call(
      updateEvent,
      eventForm.eventname,
      eventForm.eventdate,
      eventForm.description,
      eventForm.location,
      token,
      id
    );
    yield put(setMessage(res.message));
    yield put(setStatus(res.status));
    yield put(setVisible(true));
  }
  yield put(getEventData(token))
     
}

function* deleteEventDetails(action){
  const token = action.payload.token;
  if(!isEmpty(token)){
    const id = yield select((state)=>state.id)
    const res = yield call(
      deleteEvent,
      token,
      id
    );
    yield put(setMessage(res.message));
    yield put(setStatus(res.status));
    yield put(setVisible(true));
  }
  yield put(getEventData(token))
}

function* deleteAttendeeDetails(action){
  const token = action.payload.token;
  if(!isEmpty(token)){
    const id = yield select((state)=>state.id)
    const res = yield call(
      deleteAttendee,
      token,
      id
    );
    yield put(setMessage(res.message));
    yield put(setStatus(res.status));
    yield put(setVisible(true));
  }
  yield put(getAttendeeData(token))
}

function* postAttendeeDetails(action) {
    const token = action.payload.token;
    if (!isEmpty(token)) {
      const attendeeForm = yield select((state) => state.attendeeForm);
      const response = yield call(postAttendee, attendeeForm.name, attendeeForm.email, attendeeForm.phone, token);
      yield put(setMessage(response.message));
      yield put(setStatus(response.status));
      yield put(setVisible(true))
      yield put(getAttendeeData(token))
    }
  
}

function* taskDropDown(){
  const attdata=yield select((state) => state.attendeeData);
  const eventdata=yield select((state) => state.eventData);
  const DDData = yield call(MapperDD, eventdata, attdata);
  yield put(setEventDD(DDData.edd))
  yield put(setAttendeeDD(DDData.add))
 
}

function* postTaskDetails(action){
  const token = action.payload.token;
  if (!isEmpty(token)) {
    const taskForm = yield select((state) => state.taskForm)
    const eventId =yield select((state) => state.eventId)
    const attendeeId =yield select((state) => state.attendeeId)
    const res = yield call(
      postTask,
      taskForm.deadline,
      taskForm.taskName,
      eventId,
      attendeeId,
      token
    );
    yield put(setMessage(res.message));
    yield put(setStatus(res.status));
    yield put(setVisible(true));
  }
    yield put(getTaskData(token))
}

function* putTaskStatus(action){
  const token = action.payload.token;
  const data = yield select((state) => state.statusDetail)
  if (!isEmpty(token) ||!isEmpty(data)) {
    const status = data.status
    const id = data.id
    const res = yield call(
      putTask,
      status,
      id,
      token
    );
    yield put(setMessage(res.message));
    yield put(setStatus(res.status));
    yield put(setVisible(true));
  }
    yield put(getTaskData(token))
}



// Watcher saga for the fetch user data request action
function* rootSaga() {
//   yield takeLatest(FETCH_USER_DATA_REQUEST, fetchUserDataSaga);
  yield takeLatest(POST_USER_REGISTER, postUserRegister);
  yield takeLatest(POST_USER_LOGIN, postUserLogin);
  yield takeLatest(GET_EVENT_DATA, getEventDetails);
  yield takeLatest(GET_ATTENDEE_DATA, getAttendeeDetails);
  yield takeLatest(GET_TASK_DATA, getTaskDetails);
  yield takeLatest(POST_EVENT_DATA, postEventDetails);
  yield takeLatest(UPDATE_EVENT_DATA, updateEventDetails);
  yield takeLatest(DELETE_EVENT_DATA, deleteEventDetails);
  yield takeLatest(POST_ATTENDEE_DATA, postAttendeeDetails);
  yield takeLatest(DELETE_ATTENDEE_DATA, deleteAttendeeDetails);
  yield takeLatest(TASK_DD, taskDropDown);
  yield takeLatest(POST_TASK_DATA,postTaskDetails)
  yield takeLatest(PUT_TASK_STATUS,putTaskStatus)
  
  
  
  
  
}

export default rootSaga;
