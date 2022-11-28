import { useEffect, useState, useRef, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Popup from "../components/Popup";
import { toast, ToastContainer } from 'react-nextjs-toast'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

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

const events = [];
let oldDate;
let oldStartTime;
let oldEndTime;
let oldTitle;
let isDuplicateWorkout;
let emptyName;
let emptyDate;
let emptyTime;
let emptyExercises;

export default function Homepage({ props }) {

    useEffect(() => {
        const importedData = Object.entries(props);
        importedData.pop();
        const importedExercisesArray = [];
        for (let i = 0; i < importedData.length; i++) {
            const newData = {};
            // newData.title = importedData[i][1].title;
            // newData.date = importedData[i][1].date;
            // newData.startTime = importedData[i][1].startTime;
            // newData.endTime = importedData[i][1].endTime;
            // newData.exercises = importedData[i][1].exercises;

            newData.title = importedData[i][1].title;
            newData.startDate = moment(importedData[i][1].date + " " + importedData[i][1].startTime).toDate();
            newData.endDate = moment(importedData[i][1].date + " " + importedData[i][1].endTime).toDate();
            newData.exercises = importedData[i][1].exercises;
            importedExercisesArray.push(newData);
        }
        setAllEvents(importedExercisesArray); // CHANGE ALLEVENTS ARRAY TO MATCH DATE FORMAT
    }, []);

    useEffect(() => {
        return () => {
            window.clearTimeout(clickRef?.current)
        }
    }, [])

    const [newWorkout, setNewWorkout] = useState({ title: "", date: "", startTime: "", endTime: "", exercises: [] });
    const [newExercise, setNewExercise] = useState([
        { exercise: "", sets: "", reps: "", weight: "" }
    ]);
    const [allEvents, setAllEvents] = useState(events);
    //need to hanndle clicking events and having a popup show all the workouts: https://github.com/jquense/react-big-calendar/issues/456
    // THIS TOO => https://stackoverflow.com/questions/68657646/react-big-calendar-how-make-a-popup-with-onselectevent 
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [showWorkoutEditForm, setShowWorkoutEditForm] = useState(false);
    const [showWorkoutView, setShowWorkoutView] = useState(false);
    const clickRef = useRef(null)

    const handleWorkoutFormShow = () => setShowWorkoutForm(true);

    const handleWorkoutEditFormShow = () => setShowWorkoutEditForm(true);

    const handleWorkoutViewShow = () => setShowWorkoutView(true);

    const handleWorkoutViewClose = () => {
        setShowWorkoutView(false);
        setNewExercise([{ exercise: "", sets: "", reps: "", weight: "" }]);
        setNewWorkout({ title: "", date: "", startTime: "", endTime: "", exercises: [] });
    }

    const handleWorkoutEditFormClose = () => {
        setShowWorkoutEditForm(false);
        setNewExercise([{ exercise: "", sets: "", reps: "", weight: "" }]);
        setNewWorkout({ title: "", date: "", startTime: "", endTime: "", exercises: [] });
    }

    const handleWorkoutFormClose = () => {
        setShowWorkoutForm(false);
        setNewExercise([{ exercise: "", sets: "", reps: "", weight: "" }]);
        setNewWorkout({ title: "", date: "", startTime: "", endTime: "", exercises: [] });
    }

    function sendData() {
        newWorkout.username = "admin";
        fetch('http://localhost:3000/api/workoutHandler', {
            method: 'POST',
            body: JSON.stringify(newWorkout)
        });
    }

    function updateData() {
        newWorkout.username = "admin";
        newWorkout.oldStartTime = oldStartTime;
        newWorkout.oldEndTime = oldEndTime;
        newWorkout.oldDate = oldDate;
        newWorkout.oldTitle = oldTitle;
        fetch('http://localhost:3000/api/workoutHandler', {
            method: 'PUT',
            body: JSON.stringify(newWorkout)
        });
    }

    function deleteData() {
        newWorkout.username = "admin";
        newWorkout.oldStartTime = oldStartTime;
        newWorkout.oldEndTime = oldEndTime;
        newWorkout.oldDate = oldDate;
        newWorkout.oldTitle = oldTitle;
        fetch('http://localhost:3000/api/workoutHandler', {
            method: 'DELETE',
            body: JSON.stringify(newWorkout)
        });
    }

    function checkForDuplicateWorkout() {
        let date = newWorkout.date;
        newWorkout.date = moment(date).format("YYYY/MM/DD");
        for (let i = 0; i < allEvents.length; i++) {
            if (newWorkout.title == allEvents[i].title && newWorkout.date == moment(allEvents[i].startDate).format("YYYY/MM/DD")) {
                isDuplicateWorkout = true;
                break;
            }
        }
    }

    function checkForEmptyInputs() {
        newWorkout.exercises = newExercise;
        if (newWorkout.title == "") emptyName = true;
        if (newWorkout.date == "Invalid date") emptyDate = true;
        if (newWorkout.startTime == "" || newWorkout.endTime == "") emptyTime = true;
        if (newWorkout.exercises.length == 0 || newWorkout.exercises.exercise == null) emptyExercises = true;
    }

    function handleNewWorkout(e) {
        e.preventDefault();
        checkForDuplicateWorkout();
        checkForEmptyInputs();
        if (isDuplicateWorkout) {
            toast.notify('Please enter a workout with a unique title and date.', {
                duration: 3,
                type: "error"
            });
            isDuplicateWorkout = false;
        } else if (emptyName) {
            toast.notify('Please enter a name for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyName = false;
        } else if (emptyDate) {
            toast.notify('Please enter a date for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyDate = false;
        } else if (emptyTime) {
            toast.notify('Please enter a start and end time for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyTime = false;
        } else if (emptyExercises) {
            toast.notify('Please enter at least one exercise for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyExercises = false;
        } else {
            // newWorkout.exercises = newExercise;
            const calendarDisplayWorkout = {
                title: newWorkout.title,
                startDate: moment(newWorkout.date + " " + newWorkout.startTime).toDate(),
                endDate: moment(newWorkout.date + " " + newWorkout.endTime).toDate(),
                exercises: newWorkout.exercises
            };
            setAllEvents([...allEvents, calendarDisplayWorkout]);
            sendData();
            handleWorkoutFormClose();
            toast.notify('Workout added.', {
                duration: 3,
                type: "success"
            });
        }
    }

    function handleUpdateWorkout(e) {
        e.preventDefault();
        checkForDuplicateWorkout();
        checkForEmptyInputs();
        if (isDuplicateWorkout) {
            toast.notify('Please enter a workout with a unique title and date.', {
                duration: 3,
                type: "error"
            });
            isDuplicateWorkout = false;
        } else if (emptyName) {
            toast.notify('Please enter a name for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyName = false;
        } else if (emptyDate) {
            toast.notify('Please enter a date for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyDate = false;
        } else if (emptyTime) {
            toast.notify('Please enter a start and end time for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyTime = false;
        } else if (emptyExercises) {
            toast.notify('Please enter at least one exercise for the workout.', {
                duration: 3,
                type: "error"
            });
            emptyExercises = false;
        } else {
            // newWorkout.exercises = newExercise;
            deleteSelectedWorkout();
            const calendarDisplayWorkout = {
                title: newWorkout.title,
                startDate: moment(newWorkout.date + " " + newWorkout.startTime).toDate(),
                endDate: moment(newWorkout.date + " " + newWorkout.endTime).toDate(),
                exercises: newWorkout.exercises
            };
            setAllEvents([...allEvents, calendarDisplayWorkout]);
            updateData();
            handleWorkoutEditFormClose();
            toast.notify('Workout updated.', {
                duration: 3,
                type: "success"
            });
        }
    }

    function handleDeleteWorkout() {
        deleteSelectedWorkout();
        deleteData();
        handleWorkoutEditFormClose();
        toast.notify('Workout deleted.', {
            duration: 3,
            type: "success"
        });
    }

    function deleteSelectedWorkout() {
        for (let i = 0; i < allEvents.length; i++) {
            if (allEvents[i].title == oldTitle && moment(allEvents[i].startDate).format("YYYY/MM/DD") == oldDate && moment(allEvents[i].startDate).format("HH:mm") == oldStartTime && moment(allEvents[i].endDate).format("HH:mm") == oldEndTime) {
                allEvents.splice(i, 1);
                break;
            }
        }
    }

    function handleExerciseForm(index, event) {
        let data = [...newExercise];
        data[index][event.target.name] = event.target.value;
        setNewExercise(data);
    }

    function addFields() {
        let newField = { exercise: "", sets: "", reps: "", weight: "" };
        setNewExercise([...newExercise, newField]);
    }

    function removeFields() {
        let data = [...newExercise];
        data.pop();
        setNewExercise(data);
    }

    const onDoubleClickEvent = useCallback((e) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            handleWorkoutEditFormShow();
            e.date = moment(e.startDate).format("YYYY/MM/DD");
            e.startTime = moment(e.startDate).format("HH:mm");
            e.endTime = moment(e.endDate).format("HH:mm");
            setNewWorkout(e);
            setNewExercise(e.exercises);
            oldDate = moment(e.startDate).format("YYYY/MM/DD");
            oldTitle = e.title;
            oldStartTime = moment(e.startDate).format("HH:mm");
            oldEndTime = moment(e.endDate).format("HH:mm");
        }, 250)
    }, [])

    const onSelectEvent = useCallback((e) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            handleWorkoutViewShow();
            e.date = moment(e.startDate).format("YYYY/MM/DD");
            e.startTime = moment(e.startDate).format("hh:mm a");
            e.endTime = moment(e.endDate).format("hh:mm a");
            setNewWorkout(e);
            setNewExercise(e.exercises);
        }, 250)
    }, [])

    function handleEditClick() {
        oldDate = newWorkout.date;
        oldTitle = newWorkout.title;
        oldStartTime = moment(newWorkout.startDate).format("HH:mm");
        oldEndTime = moment(newWorkout.endDate).format("HH:mm");
        newWorkout.startTime = moment(newWorkout.startDate).format("HH:mm");
        newWorkout.endTime = moment(newWorkout.endDate).format("HH:mm");
        setShowWorkoutView(false);
        handleWorkoutEditFormShow();
    }

    return (
        <div className="homepage">
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <ToastContainer align={"right"} />
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
                handleSubmit={handleNewWorkout}
            />
            <Popup
                show={showWorkoutEditForm}
                onHide={handleWorkoutEditFormClose}
                isEditModal={true}
                newWorkout={newWorkout}
                setNewWorkout={setNewWorkout}
                newExercise={newExercise}
                handleExerciseForm={handleExerciseForm}
                addFields={addFields}
                removeFields={removeFields}
                handleSubmit={handleUpdateWorkout}
                handleDelete={handleDeleteWorkout}
            />
            <Popup
                show={showWorkoutView}
                onHide={handleWorkoutViewClose}
                isViewModal={true}
                newWorkout={newWorkout}
                newExercise={newExercise}
                handleEdit={handleEditClick}
            />
            <Calendar
                localizer={localizer}
                events={allEvents}
                titleAccessor="title"
                startAccessor="startDate"
                endAccessor="endDate"
                onSelectEvent={(e) => onSelectEvent(e)}
                onDoubleClickEvent={(e) => onDoubleClickEvent(e)}
                style={{ height: 500, margin: "50px", "z-index": -1 }}
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