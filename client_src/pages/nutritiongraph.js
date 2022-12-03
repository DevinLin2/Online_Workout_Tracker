import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/pie';

class workOutEcharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            meal: [],
            cal: [],
            name:""
        };
    }

    usersWorkoutDate = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    usersWorkoutweight = [520, 932, 901, 1934, 1290, 1330, 2000];
    username = "Tom";

    componentDidMount() {
        console.log("1");
        this.setState(
            {
                date: this.usersWorkoutDate,//should be connected with back-end(users' workout date)
                weight: this.usersWorkoutweight,//should be connected with back-end(users' used weight)
                name: this.username //should be connected with back-end(users' name)
            }
        )
    };

    getOption = ()=>{
        let option = {
            title: {
                text: '用户订单',
                x: 'center'
            },
            tooltip : {
                trigger: 'item',
                //提示框浮层内容格式器，支持字符串模板和回调函数形式。
                formatter: "{a} <br/>{b} : {c} ({d}%)" 
            },
            legend: {
                orient: 'vertical',
                top: 20,
                right: 5,
                data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
            },
            series : [
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {value:1000, name:'星期一'},
                        {value:1500, name:'星期二'},
                        {value:2000, name:'星期三'},
                        {value:2500, name:'星期四'},
                        {value:3000, name:'星期五'},
                        {value:2300, name:'星期六'},
                        {value:1600, name:'星期日'}
                    ],
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div className="graph">
                <h1 align={"center"}>'s Nutrition graph</h1>
                <ReactEcharts option={this.getOption()} />
            </div>
        );
    }
}

export default workOutEcharts;