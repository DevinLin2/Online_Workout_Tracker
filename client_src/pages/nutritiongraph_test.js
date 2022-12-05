import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router'

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
    const [meal, setMeal] = useState({});
    const [mealName, setMealName] = useState([]);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        if (router.isReady) {
            const mealname = [];
            const piedata = [];
            for (let i = 0; i < nutritionData.length; i++) {
                if (nutritionData[i][1].username == router.query.username) {
                    const usermeals = nutritionData[i][1].meals;
                    for(let i=0; i < usermeals.length; i++){
                        setMeal(usermeals[i].meal);
                        const data={}
                        data.name = meal.meal;
                        data.value = 5;
                        piedata.push(data);
                        mealname.push(meal.meal);
                        setMealName(mealname);
                        setPieData(piedata);
                    }
                }
            }
        }
    }, [router.isReady]);

    let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)" 
            },
            legend: {
                orient: 'vertical',
                top: 20,
                right: 5,
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
                    <Navbar.Brand href="#">
                        <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <ReactEcharts option={option} />
        </div>
    )
}



//import React, { Component } from 'react';
//import ReactEcharts from 'echarts-for-react';
//import Navbar from 'react-bootstrap/Navbar';
//import Container from 'react-bootstrap/Container';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import {
//    faDumbbell,
//} from "@fortawesome/free-solid-svg-icons";
//import { useRouter } from 'next/router'

//class workOutEcharts extends Component {
//    constructor(props){
//        super(props);
//        this.state = {
//            piedata:[],
//            meal:[],
//            ID:''
//       };
//    }
//
//    usersMeal = ['Grain', 'Beef', 'Lamb', 'vegetable'];//should be connected with the backend
//    mealsCal = [100, 1000, 500, 200];//should be connected with the backend
//    username = "Tom";//should be connected with the backend
//
//    async componentDidMount() {
//        if(router.isready){
//        const mealRes = await fetch('http://localhost:3000/api/mealHandler');
//        const mealProps = await mealRes.json();
//        const Imp
//        var usedata =[];
//        for(var i=0; i<this.usersMeal.length; i++){
//            usedata.push({name: this.usersMeal[i],value:this.mealsCal[i]})
//       }
//        this.setState(
//            {
//                piedata: usedata,
//                meal: this.usersMeal,
//                ID: this.username
//            }
//        )
//    };
//
//    getOption = (piedata,meal)=>{
//        let option = {
//           tooltip : {
//                trigger: 'item',
//                formatter: "{a} <br/>{b} : {c} ({d}%)" 
//            },
//            legend: {
//               orient: 'vertical',
//                top: 20,
//                right: 5,
//                data: meal
//            },
//            series : [
//                {
//                    name:'Nutrition Data',
//                    type:'pie',
//                    data:piedata,
//                }
//            ]
//        }
//        return option;
//    }
//
//    render() {
//        const{ID}=this.state;
//        const{piedata}=this.state;
//        const{meal}=this.state;
//        return (
//        <div>
//            <Navbar bg="dark" variant="dark">
//                    <Container fluid>
//                        <Navbar.Brand href="#">
//                            <FontAwesomeIcon icon={faDumbbell} /> Workout Tracker
//                        </Navbar.Brand>
//                    </Container>
//            </Navbar>
//            <div className="graph">
//                <h1 align={"center"}>{ID}'s Nutrition graph</h1>
//                <ReactEcharts option={this.getOption(piedata,meal)} />
//            </div>
//        </div>
//        );
//    }
//}

//export default workOutEcharts;