import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/line';

class workOutEcharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: [],
            weight: []
        };
    }

    usersWorkoutDate = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    usersWorkoutweight = [520, 932, 901, 1934, 1290, 1330, 2000];

    componentDidMount() {
        this.setState(
            {
                date: this.usersWorkoutDate,//should be connected with back-end(users' workout date);
                weight: this.usersWorkoutweight//should be connected with back-end(users' used weight)；
            }
        )
    };

    getOption=(date,weight)=>{
        return{
            title:{
                text: 'Personal Workout Progress Graph',
                x: 'center'
            },
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
        return (
            <div className='graph'>
                <ReactEcharts option={this.getOption(date,weight)} />
            </div>
        );
    }
}

export default workOutEcharts;