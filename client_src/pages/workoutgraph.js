import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

class workOutEcharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: [],
            weight: [],
            name:""
        };
    }

    usersWorkoutDate = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    usersWorkoutweight = [520, 932, 901, 1934, 1290, 1330, 2000];
    username = "Tom";

    componentDidMount() {
        this.setState(
            {
                date: this.usersWorkoutDate,//should be connected with back-end(users' workout date)
                weight: this.usersWorkoutweight,//should be connected with back-end(users' used weight)
                name: this.username //should be connected with back-end(users' name)
            }
        )
    };

    getOption=(date,weight)=>{
        return{
            xAxis: {
                type: 'category',
                data: date
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: weight,
                type: 'line'
            }]      
        };
    }

    render() {
        const{date} = this.state;
        const{weight} = this.state;
        const{name} = this.state;
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <div className="graph">
                    <h1 align={"center"}>{name}'s Workout Progress graph</h1>
                    <ReactEcharts option={this.getOption(date,weight)} />
                </div>
            </div>
        );
    }
}

export default workOutEcharts;