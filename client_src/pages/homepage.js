import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import WorkoutForm from "../components/WorkoutForm";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import Popup from "../components/Popup";
import { add } from "date-fns";

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

export default function Homepage({ props }) {

    useEffect(() => {
        const importedData = Object.entries(props);
        importedData.pop();
        const importedExercisesArray = [];
        for (let i = 0; i < importedData.length; i++) {
            const newData = {};
            newData.title = importedData[i][1].title;
            newData.date = importedData[i][1].date;
            newData.exercises = importedData[i][1].exercises;
            importedExercisesArray.push(newData);
        }
        setAllEvents(importedExercisesArray);
    }, []);

    const [newWorkout, setNewWorkout] = useState({title: "", date: "", exercises: []});
    const [newExercise, setNewExercise] = useState([
        {exercise: "", sets: "", reps: ""}
    ]);
    const [allEvents, setAllEvents] = useState(events);
    //need to hanndle clicking events and having a popup show all the workouts: https://github.com/jquense/react-big-calendar/issues/456
    // THIS TOO => https://stackoverflow.com/questions/68657646/react-big-calendar-how-make-a-popup-with-onselectevent 
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [showWorkoutEditForm, setShowWorkoutEditForm] = useState(false);

    const handleWorkoutFormClose = () => {
        setShowWorkoutForm(false);
        setNewExercise([{exercise: "", sets: "", reps: ""}]);
        setNewWorkout({title: "", date: "", exercises: []});
    }

    const handleWorkoutFormShow = () => setShowWorkoutForm(true);

    const handleWorkoutEditFormShow = () => setShowWorkoutEditForm(true);

    const handleWorkoutEditFormClose = () => {
        setShowWorkoutEditForm(false);
    }

    function sendData() {
        newWorkout.username = "admin";
        fetch('http://localhost:3000/api/workoutHandler', {
            method: 'POST',
            body: JSON.stringify(newWorkout)
        });
    }

    function handleNewWorkout(e) {
        e.preventDefault();
        let date = newWorkout.date;
        newWorkout.date = moment(date).format("YYYY/MM/DD");
        newWorkout.exercises = newExercise;
        setAllEvents([...allEvents, newWorkout]);
        sendData();
        handleWorkoutFormClose();
    }

    function handleExerciseForm(index, event) {
        let data = [...newExercise];
        data[index][event.target.name] = event.target.value;
        setNewExercise(data);
    }

    function addFields() {
        let newField = {exercise: "", sets: "", reps: ""};
        setNewExercise([...newExercise, newField]);
    }

    function removeFields() {
        let data = [...newExercise];
        data.pop();
        setNewExercise(data);
    }

    return (
        <div>
            <h1>Workout Calendar</h1>
            <Button variant="primary" onClick={handleWorkoutFormShow}>
                Create Workout
            </Button>
            <Popup 
                show={showWorkoutForm} 
                onHide={handleWorkoutFormClose}
                isWorkoutModal={true}
                newWorkout={newWorkout}
                setNewWorkout={setNewWorkout}
                newExercise={newExercise}
                handleExerciseForm={handleExerciseForm}
                addFields={addFields}
                removeFields={removeFields}
                handleNewWorkout={handleNewWorkout}
            />
            <Calendar 
                localizer={localizer} 
                events={allEvents}
                titleAccessor="title"
                startAccessor="date" 
                endAccessor="date" 
                onSelectEvent={(e) => handleSelectEvent(e)}
                style={{height: 500, margin: "50px", "z-index": -1}}
            />
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/workoutHandler');
    const props = await res.json();
    return {
        props: {
            props,
        },
    }
}