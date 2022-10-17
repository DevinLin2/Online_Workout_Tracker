import { useState } from "react";
import Calendar from "react-calendar";

export default function homepage() {
    const [date, setDate] = useState(new Date());
    var data = {
        "username": "admin"
    }

    function handleClick() {
        fetch('http://localhost:5000/insert', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        })
    }

    return (
        <div className='app'>
            <h1 className='text-center'>Workout Tracker</h1>
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} />
            </div>
            <p className='text-center'>
                <span className='bold'>Selected Date:</span>{' '}
                {date.toDateString()}
            </p>
            <div onClick={handleClick}>
                Send data to backend
            </div>
        </div>
    );
}

