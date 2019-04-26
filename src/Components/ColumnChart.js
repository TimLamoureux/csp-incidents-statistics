import React, {Component} from 'react';
import Highcharts from 'highcharts';
import {
    HighchartsChart,
    withHighcharts,
    provideChart,
    Title,
    ColumnSeries,
    Tooltip,
    XAxis,
    YAxis
} from 'react-jsx-highcharts';

// Good example of HOC https://whawker.github.io/react-jsx-highcharts/examples/CustomComponent/index.html
class ColumnChart extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let props = this.props;

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
}

export default provideChart(ColumnChart);

// const ColumnChart = ({data}) => {
//
//     // let dataLabels = props.dataLabels | {
//     //     enabled: true,
//     //     format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f} %)',
//     // };
//
//     let plotOptions = /*props.plotOptions |*/ {
//         series: {
//             dataLabels: {
//                 enabled: true,
//                 format: '<b>{point.name}</b> ({point.y:,.0f})'
//             },
//             tooltip: {}
//         },
//         tooltip: {}
//     }
// }

//export default withHighcharts(ColumnChart, Highcharts);
