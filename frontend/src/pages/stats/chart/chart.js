import React, {memo, useRef, useState, useEffect} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import { useResizeDetector } from 'react-resize-detector';
import { useSelector } from 'react-redux';
import {ChartWrapper, ChartHeader} from './chart.style';

HC_patternFill(Highcharts);
HC_more(Highcharts);
HighchartVaryWide(Highcharts);
Highcharts.AST.allowedReferences.push('data:');
const Chart = (props) => {

    const {categories, interviewSeries, pendingSeries, declineSeries, containerHeight, containerWidth, containerRef} = props;

    const chartRef = useRef(HighchartsReact.RefObject);

    const {height:headerHeight, ref:headerRef } = useResizeDetector();

    useEffect(() => {
        if(chartRef.current){
            let chart = chartRef.current.chart;
            chart.setSize(containerWidth, containerHeight -  headerHeight - 5);
        }
    },[containerWidth, containerHeight, headerHeight])


    const options = {
        chart: {
            renderTo: 'container',
            animation:false,
        },

        credits: {
            enabled: false
        },

        tooltip: {
            shared:true,
            // shadow:false,
            useHTML: true,
            backgroundColor: '#FFFFFF',
            borderWidth: 0,
            borderRadius:8,
            style: {
                zIndex: 10000,
            },
            outside: true,
            formatter: function() {
                const date = this.x;

                const declined = this.points[0].y;
                const interview = this.points[1].y;
                const pending = this.points[2].y;

                return `<div style="font-family: Roboto; display:flex; flex-direction:column; align-items: flex-start; padding:0.5vmin 1vmin 0 1vmin">
                    <div style="font-weight:500; margin-bottom:1vmin; font-size:3.5vmin; color:#27313A">${date}</div>
                    <div style="font-weight:500; margin-bottom:0.7vmin; font-size:2vmin; color:#5C5C5C">Pending: ${pending}</div>
                    <div style="margin-bottom:0.7vmin; color:#5C5C5C; font-size:2vmin;">Interview: ${interview}</div>
                    <div style="color:#5C5C5C; font-size:2vmin; margin-bottom:0.7vmin;">Declined: ${declined}</div>
                </div>`
            }
        },
        xAxis: {
            crosshair: {
                width:25,
                color:'rgba(222, 224, 224, 0.5)'
            },
            categories:categories,
            title:{
                text:null
            },
            labels: {
                // enabled:true,
                useHTML: true,
                formatter: function() {
                 return this.value;
                }
            },
        },
        legend:{
            enabled: true,
        },
        title: {
            enabled: false,
            text:null
        },

        yAxis: [
            {
                title: {
                    text:`<span style="font-family: Roboto; color:black">Number of applications</span>`,
                    margin: 30,
                    style: {
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        fontSize:20
                    }
                },
                labels: {
                    style: {
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                        color: '#5C5C5C',
                        fontSize:'14px',
                        textOutline: 0
                    },
                    formatter: function() {
                        return this.value;
                    }
                },
            },
        ],
        plotOptions: {
            series:{
                animation: {
                    duration:0
                },
                turboThreshold: 100000,
                boostThreshold: 100000,
                pointWidth:15,
                grouping: false,
                states: {
                    inactive: {
                        opacity: 1
                    }
                }
            },

        },
        series: [
            {
                type: 'spline',
                name:'Declined',
                data: declineSeries,
                color: 'rgb(214, 106, 106)',
                marker:{
                    symbol:'circle'
                }
            },
            {
                type:'spline',
                color:'rgb(100, 122, 203)',
                name:'Interview',
                data: interviewSeries,
                marker:{
                    symbol:'circle'
                }
            },
            {
                type:'spline',
                color:'rgb(233, 185, 73)',
                name:'Pending',
                data: pendingSeries,
                marker:{
                    symbol:'circle'
                }
            },
        ]
    };

    return (
        <ChartWrapper ref={containerRef}>
          
            <ChartHeader ref={headerRef}>
                <h1>Jobs Applications</h1>
                <p>Up to last 30 days</p>
            </ChartHeader>
                    
            <HighchartsReact
                key={containerWidth + containerHeight}
                ref={chartRef}
                highcharts={Highcharts}
                options={options}
            />
        </ChartWrapper>
    );
};

export default memo(Chart);
