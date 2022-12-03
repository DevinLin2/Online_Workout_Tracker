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
            piedata:[],
            meal:[],
            ID:''
        };
    }

    usersMeal = ['Grain', 'Beef', 'Lamb', 'vegetable'];//should be connected with the backend
    mealsCal = [100, 1000, 500, 200];//should be connected with the backend
    username = "Tom";//should be connected with the backend

    componentDidMount() {
        var usedata =[];
        for(var i=0; i<this.usersMeal.length; i++){
            usedata.push({name: this.usersMeal[i],value:this.mealsCal[i]})
        }
        this.setState(
            {
                piedata: usedata,
                meal: this.usersMeal,
                ID: this.username
            }
        )
    };

    getOption = (piedata,meal)=>{
        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)" 
            },
            legend: {
                orient: 'vertical',
                top: 20,
                right: 5,
                data: meal
            },
            series : [
                {
                    name:'Nutrition Data',
                    type:'pie',
                    data:piedata,
                }
            ]
        }
        return option;
    }

    render() {
        const{ID}=this.state;
        const{piedata}=this.state;
        const{meal}=this.state;
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
                <h1 align={"center"}>{ID}'s Nutrition graph</h1>
                <ReactEcharts option={this.getOption(piedata,meal)} />
            </div>
        </div>
        );
    }
}

export default workOutEcharts;