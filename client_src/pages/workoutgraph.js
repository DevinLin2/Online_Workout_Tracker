import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/workoutHandler');
    const props = await res.json();
    return {
        props: {
            props,
        },
    }
}

const events = [];
let clickedSubmit = false;

export default function workoutgraph({ props }) {

    const workoutData = Object.entries(props);
    const router = useRouter();
    const [workouts, setWorkouts] = useState(events);
    const [userSelectedWorkout, setUserSelectedWorkout] = useState("");
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [dates, setDates] = useState([]);
    const [weights, setWeights] = useState([]);
    // const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (router.isReady) {
            const workoutArray = [];
            for (let i = 0; i < workoutData.length; i++) {
                if (workoutData[i][1].username == router.query.username) {
                    const data = {};
                    data.date = workoutData[i][1].date;
                    data.exercises = workoutData[i][1].exercises;
                    workoutArray.push(data);
                }
            }
            setWorkouts(workoutArray);
        }
    }, [router.isReady]);

    function findWorkouts() {
        const data = [];
        for (let i = 0; i < workouts.length; i++) {
            const exercises = workouts[i].exercises;
            for (let j = 0; j < exercises.length; j++) {
                const exerciseName = exercises[j].exercise.toLowerCase();
                if (exerciseName == userSelectedWorkout || exerciseName == userSelectedWorkout + "s") {
                    // add weight and date to json array
                    const graphData = {
                        date: workouts[i].date,
                        weight: exercises[j].weight,
                    }
                    data.push(graphData);
                }
            }
        }
        setSelectedWorkouts(data);
    }

    function sortWorkouts() {
        setWeights([]);
        setDates([]);
        const sortedArray = selectedWorkouts.sort((a, b) => moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD'))
        // setSelectedWorkouts(sortedArray);
        const date = [];
        const weight = [];
        for (let i = 0; i < sortedArray.length; i++) {
            date.push(sortedArray[i].date);
            weight.push(parseInt(sortedArray[i].weight));
        }
        setDates(date);
        setWeights(weight);
        // clickedSubmit = false;
    }

    function handleSubmit(e) {
        clickedSubmit = true;
        e.preventDefault();
        findWorkouts();
        sortWorkouts();
    }

    let option = {
        xAxis: {
            type: 'category',
            data: dates
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: weights,
                type: 'line'
            }
        ]
    };

    useEffect(() => {
        findWorkouts();
        sortWorkouts();
    }, [userSelectedWorkout]);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Form>
                <Container>
                    <Row>
                        <p></p>
                        <Col xs={10}>
                            <Form.Select onChange={(e) => setUserSelectedWorkout(e.target.value)} aria-label="Default select example">
                                <option>Select an exercise</option>
                                <option value="squat">Squat</option>
                                <option value="bench">Bench</option>
                                <option value="deadlift">Deadlift</option>
                            </Form.Select>
                        </Col>
                        <Col xs={2}>
                            <Button variant="success" onClick={handleSubmit}>Enter</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            {clickedSubmit && <ReactEcharts option={option} />}
        </div>
    )
}