import React from 'react';
import Highcharts from 'highcharts';
import {
    HighchartsChart,
    withHighcharts,
    Title,
    Chart,
    SankeySeries,
    Legend,
    Tooltip,
    /*XAxis,*/
    YAxis
} from 'react-jsx-highcharts';


const SankeyChart = (props) => {

    let dataLabels = props.dataLabel | {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f} %)',
    };

    return (
        <HighchartsChart>
            <Title>{props.title}</Title>
            <YAxis id="y">
                <SankeySeries id={props.id} data={props.data} dataLabels={dataLabels} showInLegend={true} formatString="Test point.x" />
            </YAxis>
            <Legend />
            <Tooltip />
        </HighchartsChart>
    )
}

export default withHighcharts(SankeyChart, Highcharts);
