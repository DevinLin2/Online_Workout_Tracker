import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutFormContent from "../components/WorkoutFormContent";

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
const exerciseID = 0; // We need a way to pull the most recent id 


export default function homepage() {
    const [newEvent, setNewEvent] = useState({exercise: "", date: "", sets: "", reps: ""})
    const [allEvents, setAllEvents] = useState(events)
    const [showPopup, setShowPopup] = useState(false);
    //need to hanndle clicking events and having a popup show all the workouts: https://github.com/jquense/react-big-calendar/issues/456
    // THIS TOO => https://stackoverflow.com/questions/68657646/react-big-calendar-how-make-a-popup-with-onselectevent 
    function sendData() {
        newEvent.username = "steve"
        fetch('http://localhost:5000/insert', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newEvent)
        })
    }

    function handleNewEvent() {
        setAllEvents([...allEvents, newEvent]);
        // console.log(newEvent.sets);
        sendData();
    }

    return (
        <div>
            <h1>Workout Calendar</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Add Exercise" 
                    style={{width: "20%", marginRight: "10px"}}
                    value={newEvent.exercise} onChange={(e) => setNewEvent({...newEvent, exercise: e.target.value})}
                />
                <input 
                    type="text" 
                    placeholder="Sets Done" 
                    // style={{width: "20%", marginRight: "10px"}}
                    value={newEvent.sets} onChange={(e) => setNewEvent({...newEvent, sets: e.target.value})}
                />
                <input 
                    type="text" 
                    placeholder="Reps Done" 
                    // style={{width: "20%", marginRight: "10px"}}
                    value={newEvent.reps} onChange={(e) => setNewEvent({...newEvent, reps: e.target.value})}
                />
                <DatePicker
                    placeholderText="Date"
                    style={{marginRight: "10px"}}
                    selected={newEvent.date}
                    onChange={(date) => setNewEvent({...newEvent, date})}
                />
                <button style={{marginTop: "10px"}} onClick={handleNewEvent}>Enter</button>
            </div>
            <div id="workout-form-root">
                <button onClick={() => setShowPopup(true)}>Open Workout Form</button>
                <WorkoutForm onClose={() => setShowPopup(false)} show={showPopup}>
                    Hello
                    {/* Make content of modal another react component eg. <WorkoutFormContent ...></WorkoutFormContent> */}
                    <WorkoutFormContent></WorkoutFormContent>
                </WorkoutForm>
            </div>
            <Calendar 
                localizer={localizer} 
                events={allEvents}
                titleAccessor="exercise"
                startAccessor="date" 
                endAccessor="date" 
                style={{height: 500, margin: "50px", "z-index": -1}}
            />
        </div>
    );
}

