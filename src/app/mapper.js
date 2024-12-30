'use client'

import { format, parse } from "date-fns";
import { setMessage, setStatus, setVisible } from "./Action";
import { groupBy, isEmpty, keys, toInteger } from "lodash";
 

export const userRegister = async (email, password, username,) => {
 
  try {
    const response = await fetch('http://localhost:9090/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });

    if (response.status === 201) {
      const data = await response.json();
      sessionStorage.setItem("authToken", data)
      return data
    } else {
      const errorData = await response.json();
      return errorData
    }
  } catch (err) {
      return { message: "Something went wrong", status: "error" }; // Return error data in case you need it elsewhere
  }

};

export const UserLoginToken =async(email, password)=>{
  try {
    const response = await fetch('http://localhost:9090/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password}),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data;  
    } else {
      const errorData = await response.json();
      return errorData
    }
  } catch (err) {
      return { message: "Something went wrong", status: "error" }; // Return error data in case you need it elsewhere
  }
}

export const fetchEventData=async(token)=>{

  try {
    const response = await fetch('http://localhost:9090/api/getevents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;  
    } else {
      const errorData = await response.json();
      return errorData
    }
  } catch (err) {
      return { message: "Something went wrong", status: "error" }; // Return error data in case you need it elsewhere
  }
}

export const fetchAttendeeData=async(token)=>{
 
  try {
    const response = await fetch('http://localhost:9090/api/getattendee', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;  
    } else {
      const errorData = await response.json();
      return errorData
    }
  } catch (err) {
      return { message: "Something went wrong", status: "error" };  
  }

}


export const fetchTaskData=async(token)=>{
 
  try {
    const response = await fetch('http://localhost:9090/api/gettask', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;  
    } else {
      const errorData = await response.json();
      return errorData
    }
  } catch (err) {
      return { message: "Something went wrong", status: "error" };  
  }

}


 

export const postEvent = async (name, event_date, description, location, token) => {
  
  if (
    !name || 
    !event_date || 
    !description || 
    !location || 
    !token || 
    isEmpty(name) || 
    isEmpty(event_date) || 
    isEmpty(description) || 
    isEmpty(location) || 
    isEmpty(token)
  ) {
    return { message: 'All fields are required and cannot be empty', status: 'error' };
  }


  try {
    const response = await fetch('http://localhost:9090/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, event_date, description, location }),
    });

    if (response.ok) {
      const data = await response.json();
      return {...data};
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (err) {
    return { message: 'Something went wrong', status: 'error' };  
  }
};

export const postAttendee = async (name, email, phone,token) => {

  
  if (
    !name || 
    !email || 
    !phone ||  
    !token || 
    isEmpty(name) || 
    isEmpty(email) || 
    isEmpty(phone) || 
    isEmpty(token)
  ) {
    return { message: 'All fields are required and cannot be empty', status: 'error' };
  }


  try {
    const response = await fetch('http://localhost:9090/api/attendee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({name, email, phone}),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (err) {
    return { message: 'Something went wrong', status: 'error' }; // Return error message in case of network issues
  }
};


export const postTask = async (deadline, taskName, eventId,attendeeId,token) => {

  
  
  if (
    !deadline || 
    !taskName ||  
    isEmpty(deadline) || 
    isEmpty(taskName) || 
    !eventId>0 || !attendeeId>0
  ) {
    return { message: 'All fields are required and cannot be empty', status: 'error' };
  }

  try {
    const response = await fetch('http://localhost:9090/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        deadline,
        taskName,
        eventId: toInteger(eventId), 
        attendeeId: toInteger(attendeeId) 
      }),
      
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (err) {
    return { message: 'Something went wrong', status: 'error' }; // Return error message in case of network issues
  }
};





export const updateEvent = async (name, event_date, description, location, token,id) => {
  
  if (
    !name ||
    !id || 
    !event_date || 
    !description || 
    !location || 
    !token || 
    isEmpty(name) || 
    isEmpty(event_date) || 
    isEmpty(description) || 
    isEmpty(location) || 
    isEmpty(token)
  ) {
    return { message: 'All fields are required and cannot be empty', status: 'error' };
  }


  try {
    const response = await fetch(`http://localhost:9090/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, event_date, description, location }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (err) {
    return { message: 'Something went wrong', status: 'error' };  
  }
};


export const putTask = async (sta,id,token) => {
  
 let status=(sta==="PENDING"?"COMPLETED":"PENDING")
  if ( !id || 
    isEmpty(status)
  ) {
    return { message: 'All fields are required and cannot be empty', status: 'error' };
  }


  try {
    const response = await fetch(`http://localhost:9090/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (err) {
    return { message: 'Something went wrong', status: 'error' };  
  }
};


export const deleteEvent = async (token,id) => {
  
  if (
    !id || 
    !token || 
    isEmpty(token)
  ) {
    return { message: 'All fields are required and cannot be empty', status: 'error' };
  }


  try {
    const response = await fetch(`http://localhost:9090/api/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (err) {
    return { message: 'Something went wrong', status: 'error' };  
  }
};

export const deleteAttendee = async (token,id) => {
  
  if (
    !id || 
    !token || 
    isEmpty(token)
  ) {
    return { message: 'All fields are required and cannot be empty', status: 'error' };
  }


  try {
    const response = await fetch(`http://localhost:9090/api/attendee/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (err) {
    return { message: 'Something went wrong', status: 'error' };  
  }
};

export const MapperDD=(edata,adata)=>{
  let ed=edata
  let ad = adata
  let edd=[]
  let add=[]
  if(!isEmpty(ed)){
    let e = groupBy(edata, 'name');
    edd = keys(e).map((key) => ({
      name: key,    
      id: e[key][0].eid, 
    }));

    
  }
  if(!isEmpty(ad)){
    let a = groupBy(adata,"name")
    add = keys(a).map((key) => ({
      name: key,    
      id: a[key][0].aid, 
    }));
  }
  return {edd,add}
}


 