import React from 'react';
import Highcharts from 'highcharts';
import {
    HighchartsChart,
    withHighcharts,
    Title,
    Chart,
    PieSeries,
    Legend,
    Tooltip,
    XAxis,
    YAxis
} from 'react-jsx-highcharts';


const PieChart = (props) => {

    let dataLabels = /*props.dataLabels |*/ {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f} %)',
    };



    return (
        <HighchartsChart>
            <Title>{props.title}</Title>
            {/*<XAxis type="category" />*/}
            <YAxis id="y">
                <PieSeries id={props.id} data={props.data} dataLabels={dataLabels} showInLegend={true} formatString="Test point.x" />
            </YAxis>
            <Legend />
            <Tooltip />
        </HighchartsChart>
    );
}

export default withHighcharts(PieChart, Highcharts);
