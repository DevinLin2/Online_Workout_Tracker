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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    const [title, setTitle] = useState("");
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

    function handleNewEvent(e) {
        e.preventDefault();
        const date = new Date(newEvent.date);
        console.log(date);
        const formattedDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDay() + 1}`;
        console.log(formattedDate);
        const newDate = new Date(formattedDate);
        console.log(newDate);
        newEvent.date = newDate;
        setAllEvents([...allEvents, newEvent]);
        console.log(newEvent.date);
        // sendData();
    }

    return (
        <div>
            <h1>Workout Calendar</h1>
            <WorkoutForm>
            <Form>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Workout name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter workout name..."/>
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date:</Form.Label>
                                {/* <DatePicker placeholderText="Date" selected={newEvent.date} onChange={(date) => setNewEvent({...newEvent, date})}/> */}
                                <Form.Control type="date" selected={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="exercise">
                                <Form.Label>Exercise:</Form.Label>
                                <Form.Control type="text" placeholder="Enter exercise..." value={newEvent.exercise} onChange={(e) => setNewEvent({...newEvent, exercise: e.target.value})}/>
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="sets">
                                <Form.Label>Sets done:</Form.Label>
                                <Form.Control type="text" placeholder="Enter sets done..." value={newEvent.sets} onChange={(e) => setNewEvent({...newEvent, sets: e.target.value})}/>
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="reps">
                                <Form.Label>Reps done:</Form.Label>
                                <Form.Control type="text" placeholder="Enter reps done..." value={newEvent.reps} onChange={(e) => setNewEvent({...newEvent, reps: e.target.value})}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button onClick={handleNewEvent}>Enter</Button>
                </Container>
            </Form>
            </WorkoutForm>
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