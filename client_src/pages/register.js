import { useState } from "react";

const events = []

function Register() {
    const [newEvent, setNewEvent] = useState({username: "", password: ""})
    const [allEvents, setAllEvents] = useState(events)

    function sendData() {
        fetch('http://localhost:5000/register', {
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
    <div className="login">
        <h1>Online Workout Tracker</h1>
        <h2>Register</h2>
        <form className="form">
                    <p>Username</p>
                    <div className="formItem">
                        <input 
                            type="text" 
                            placeholder="Enter Username(E-mail Address/Phone number)" 
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

                    <p>Re-enter Password</p>
                    <div className="formItem">
                        <input 
                            type="text" 
                            placeholder="Re-enter Password" 
                            value={newEvent.exercise} onChange={(e) => setNewEvent({...newEvent, password: e.target.value})}
                        />
                    <span class="error"></span>
                    </div>

                    <div className="formItemBtn">
                        <button className="loginBtn" onClick={()=>handleNewEvent}>Register</button>
                    </div>
            </form>
    </div>
    );
}

export default Register;
