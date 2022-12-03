import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/line';

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

            <div className="graph">
                <h1 align={"center"}>{name}'s Workout Progress graph</h1>
                <ReactEcharts option={this.getOption(date,weight)} />
            </div>
        );
    }
}

export default workOutEcharts;