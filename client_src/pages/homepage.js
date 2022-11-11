import { useState } from "react";
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
    const [newWorkout, setNewWorkout] = useState({title: "", date: "", exercises: []});
    const [newExercise, setNewExercise] = useState([
        {exercise: "", sets: "", reps: ""}
    ]);
    const [allEvents, setAllEvents] = useState(events);
    //need to hanndle clicking events and having a popup show all the workouts: https://github.com/jquense/react-big-calendar/issues/456
    // THIS TOO => https://stackoverflow.com/questions/68657646/react-big-calendar-how-make-a-popup-with-onselectevent 
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);

    const handleWorkoutFormClose = () => {
        setShowWorkoutForm(false);
        setNewExercise([{exercise: "", sets: "", reps: ""}]);
        setNewWorkout({title: "", date: "", exercises: []});
    }
    const handleWorkoutFormShow = () => setShowWorkoutForm(true);

    function sendData() {
        fetch('http://localhost:3000/api/workoutHandler', {
            method: 'POST',
            // mode: 'cors',
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
        // console.log(newWorkout.title);
        // console.log(newWorkout.date);
        // console.log(newWorkout.exercises);
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

    // ADD A FUNCTION TO REMOVE FIELDS USING ARRAY.POP()

    return (
        <div>
            <h1>Workout Calendar</h1>
            <Button variant="primary" onClick={handleWorkoutFormShow}>
                Create Workout
            </Button>
            <Modal show={showWorkoutForm} onHide={handleWorkoutFormClose} dialogClassName="workoutModal">
                <Modal.Header closeButton>
                    <Modal.Title>Today's Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col xs={8}>
                                    <Form.Group className="mb-3" controlId="title">
                                        <Form.Label>Workout name:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter workout name..." value={newWorkout.title} onChange={(e) => setNewWorkout({...newWorkout, title: e.target.value})}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group className="mb-3" controlId="date">
                                        <Form.Label>Date:</Form.Label>
                                        <Form.Control type="date" selected={newWorkout.date} onChange={(e) => setNewWorkout({...newWorkout, date: e.target.value})}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {newExercise.map((input, index) => {
                                return (
                                    <Row key={index}>
                                        <Col xs={4}>
                                            <Form.Group className="mb-3" controlId="exercise">
                                                <Form.Label>Exercise:</Form.Label>
                                                <Form.Control type="text" name="exercise" placeholder="Enter exercise..." value={input.exercise} onChange={event => handleExerciseForm(index, event)}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4}>
                                            <Form.Group className="mb-3" controlId="sets">
                                                <Form.Label>Sets done:</Form.Label>
                                                <Form.Control type="text" name="sets" placeholder="Enter sets done..." value={input.sets} onChange={event => handleExerciseForm(index, event)}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4}>
                                            <Form.Group className="mb-3" controlId="reps">
                                                <Form.Label>Reps done:</Form.Label>
                                                <Form.Control type="text" name="reps" placeholder="Enter reps done..." value={input.reps} onChange={event => handleExerciseForm(index, event)}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )
                            })}
                            <Row>
                                <Col xs={4}>
                                    <Button variant="primary" onClick={addFields}>Add exercise</Button>
                                </Col>
                                <Col xs={{ span: 4, offset: 4 }}>
                                    <Button  className="float-end" variant="success" onClick={handleNewWorkout}>Enter</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
            <Calendar 
                localizer={localizer} 
                events={allEvents}
                titleAccessor="title"
                startAccessor="date" 
                endAccessor="date" 
                style={{height: 500, margin: "50px", "z-index": -1}}
            />
        </div>
    );
}