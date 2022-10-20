import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
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

export default function homepage() {
    const [newEvent, setNewEvent] = useState({exercise: "", date: "", sets: "", reps: ""})
    const [allEvents, setAllEvents] = useState(events)

    function handleNewEvent() {
        setAllEvents([...allEvents, newEvent])
    }

    function handleClick() {
        fetch('http://localhost:5000/insert', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        })
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
            <Calendar 
                localizer={localizer} 
                events={events}
                startAccessor="date" 
                endAccessor="date" 
                style={{height: 500, margin: "50px"}}
            />
        </div>
    );
}

