import { useState } from "react";
import { dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = []

export default function login() {
    const [newEvent, setNewEvent] = useState({username: "", password: ""})
    const [allEvents, setAllEvents] = useState(events)

    function sendData() {
        //newEvent.username = "steve"
        fetch('http://localhost:5000/insert', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newEvent)
        })
    }

    function handleNewEvent() {
        setAllEvents([...allEvents, newEvent])
        sendData();
    }

    return (
    <div class="form-wrapper">
        <h1>Login</h1>
        <form id="loginForm" >
          <div class="row">
              <lable>Username: </lable>
              <input 
               type="text" 
               name="username"
               value={newEvent.username} onChange={(e) => setNewEvent({...newEvent, username: e.target.value})}
               />
                <span class="error"></span>
         </div>
           <div class="row">
               <lable>Password: </lable>
               <input 
                type="password" 
                name="password"
                value={newEvent.exercise} password={(e) => setNewEvent({...newEvent, password: e.target.value})}
                />
            <span class="error"></span>
        </div>

        <div class="row">
            <input 
                type="submit"
                />
        </div>

        </form>
    </div>
    );
}

