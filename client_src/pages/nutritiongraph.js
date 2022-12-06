import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/mealHandler');
    const props = await res.json();
    return {
        props: {
            props,
        },
    }
}

export default function nutritionGraph({ props }) {

    const nutritionData = Object.entries(props);
    const router = useRouter();
    const [mealName, setMealName] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    let date = Date.parse(selectedDate);
    let strDate = new Date(date).toLocaleDateString();

    function dateChange(){
        date = Date.parse(selectedDate);
        strDate = new Date(date).toLocaleDateString();
        // alert(strDate);
    }

    useEffect(() => {
        if (router.isReady) {
            
            dateChange();

            const mealname_buf = [];
            const piedata_buf = [];

            for (let i = 0; i < nutritionData.length; i++) {
                console.log(moment(nutritionData[i][1].date).format("YYYY/MM/DD"));
                console.log(moment(selectedDate).format("YYYY/MM/DD"));
                if (nutritionData[i][1].username == router.query.username && moment(nutritionData[i][1].date).format("YYYY/MM/DD") == moment(selectedDate).format("YYYY/MM/DD")) {
                    const one_usermeals = nutritionData[i][1].meals;
                    for(let j=0; j < one_usermeals.length; j++){
                        
                        const permealData = Object.entries(one_usermeals[j]);


                        const oneMealData={}
                        oneMealData.name = permealData[0][1];
                        oneMealData.value = parseInt(permealData[1][1]);
                        
                        piedata_buf.push(oneMealData);
                        mealname_buf.push(permealData[0][1]);
                    }
                    setMealName(mealname_buf);
                    setPieData(piedata_buf);
                }
            }
        }
    }, [router.isReady,selectedDate]);

    let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)" 
            },
            legend: {
                orient: 'vertical',
                top: 20,
                right: 200,
                data: mealName
            },
            series : [
                {
                    name:'Nutrition Data',
                    type:'pie',
                    data:pieData
                }
            ]
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href={'/homepage?username=' + router.query.username}>
                        <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href={'/workoutgraph?username=' + router.query.username}>Workout Graph</Nav.Link>
                        <Nav.Link href="/login">Log Out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <p></p>
            <h1>Nutrition Pie Chart</h1>

            <Form>
                <Container>
                    <strong>Select a date to see meal chart: </strong>
                    <Row>
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date:</Form.Label>
                                <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>

            {/* <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
            /> */}
            <ReactEcharts option={option} />
        </div>
    )
}