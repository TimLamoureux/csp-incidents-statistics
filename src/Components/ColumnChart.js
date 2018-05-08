import React from 'react';
import Highcharts from 'highcharts';
import {
    HighchartsChart,
    withHighcharts,
    Title,
    Chart,
    ColumnSeries,
    Legend,
    Tooltip,
    XAxis,
    YAxis
} from 'react-jsx-highcharts';


const ColumnChart = (props) => {

    // let dataLabels = props.dataLabels | {
    //     enabled: true,
    //     format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f} %)',
    // };

    let plotOptions = /*props.plotOptions |*/ {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})'
            },
            tooltip: {}
        },
        tooltip: {}
    }

    // TODO: Sort serie ASC

    return (
        <HighchartsChart plotOptions={plotOptions} className={props.className}>
            <Title>{props.title}</Title>
            <XAxis id="x" type="category" categories={props.data.map( (curr) => curr.name )} />
            <YAxis id="y" >
                <ColumnSeries id={props.id} data={props.data} colorByPoint={true} showInLegend={true} size={500} formatString="Test point.x" />
            </YAxis>
            <Tooltip />
        </HighchartsChart>
    );
}

export default withHighcharts(ColumnChart, Highcharts);
