import { useState } from "react";
import { Link, Router, Route, Routes } from "react-router-dom";
import Register from "./register";

const events = []

export default function loginpage() {
    const [newEvent, setNewEvent] = useState({username: "", password: ""})
    const [allEvents, setAllEvents] = useState(events)

    function sendData() {
        //newEvent.username = "steve"
        fetch('http://localhost:5000/insert', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newEvent)//allEvent?
        })
    }

    function handleNewEvent() {
        setAllEvents([...allEvents, newEvent])
        sendData();
    }
    
    return (
        <div className="login">
            <h1>Online Workout Tracker</h1>
            <form className="form">
                    <p>Username</p>
                    <div className="formItem">
                        <input 
                            type="text" 
                            placeholder="Enter Username" 
                            value={newEvent.username} onChange={(e) => setNewEvent({...newEvent, username: e.target.value})}
                        />
                    <span class="error"></span>
                    </div>

                    <p>Password</p>
                    <div className="formItem">
                        <input 
                            type="text" 
                            placeholder="Enter Password" 
                            value={newEvent.exercise} onChange={(e) => setNewEvent({...newEvent, password: e.target.value})}
                        />
                    <span class="error"></span>
                    </div>

                    <div className="formItemBtn">
                        <bottom className="loginBtn" onClick={()=>handleNewEvent}>Login</bottom>
                    </div>
  
            </form>
        </div>
    );
}
