import React, {Component} from 'react';
import './App.css';

import moment from 'moment';
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr';

// Data
import Incidents from "./Components/Incidents";
import PieChart from "./Components/PieChart";
import ColumnChart from "./Components/ColumnChart";
import { withHighcharts } from 'react-jsx-highcharts';
import Highcharts from 'highcharts/highcharts';
//import SankeyChart from "./Components/SankeyChart";


// Todo add possibility to filter dates


class App extends Component {

    constructor() {
        super();

        // Adjust timeframe for current season.
        // Check if before Nov 1st. If so, substract one year and set to nov 1st. If Nov and Dec, sets to nov 1st of this year
        let start = moment();

        if ( start.month() < 10 ) {
            start = start.year(start.year()-1);
        }
        start.month('October').date(1);

        this.state = {
            dateFormat: 'Y-m-d',
            startDate: start.toDate(),
            endDate: moment().toDate(),
            rawIncidents: new Incidents(),
            // incidents: filteredIncidents,
            // incidentCount: filteredIncidents.data.length,
            gender: [],
            age: [],
            activity: [],
            injury_location: [],
            treatments: [],
            patrollers: [],
            transport_base: [],
            transport_out: [],
            destination: []
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    static capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    refreshData() {
        let filteredIncidents = this.state.rawIncidents.filter({
            dateStart: this.state.startDate,
            dateEnd: this.state.endDate
        });

        this.setState({
            incidents: filteredIncidents,
            incidentCount: filteredIncidents.data.length,
            gender: filteredIncidents.getOneMetric("gender").toUsableData(),
            age: filteredIncidents.getOneMetric("age").groupByNumber("5").toUsableData(),
            activity: filteredIncidents.getOneMetric("activity").toUsableData(),
            injury_location: filteredIncidents.getOneMetric("injury_location").toUsableData(/*sort*/),
            treatments: filteredIncidents.getOneMetric("treatment").toUsableData(),
            patrollers: filteredIncidents.getOneMetric("patrollers").toUsableData(),
            transport_base: filteredIncidents.getOneMetric("transport_base").toUsableData(),
            transport_out: filteredIncidents.getOneMetric("transport_out").toUsableData(),
            destination: filteredIncidents.getOneMetric("destination").toUsableData()
        });


    }


    render() {

        let dateChange = (dateObj, dateStr, flatpickrInstance) => {
            if (typeof flatpickrInstance.config.id === 'undefined')
                return;

            this.setState({
                // Interpolate state var name from flatpickr object config
                [flatpickrInstance.config.id]: dateStr
            }, () => {
                console.log(`Updated ${flatpickrInstance.config.id} (${dateStr}). Calling refresh.`);
                this.refreshData();
            });
        };


        //incidents.toSankeyData( ["transport_base", "transport_out"], "destination" );

        //let trp = incidents.toSankeyData( ["transport_base", "transport_out", "destination"] );

        return (
            <div>
                <h1>Statistics</h1>
                <div>
                    Between &nbsp;
                    <Flatpickr
                        value={this.state.startDate}
                        onChange={dateChange}
                        options={{
                            id: 'startDate',
                            altFormat: this.state.dateFormat,
                            dateFormat: this.state.dateFormat,
                            maxDate: new Date()
                        }}
                    />
                    &nbsp;and&nbsp;
                    <Flatpickr
                        id={'endDate'}
                        value={this.state.endDate}
                        onChange={dateChange}
                        options={{
                            id: 'endDate',
                            altFormat: this.state.dateFormat,
                            dateFormat: this.state.dateFormat,
                            maxDate: new Date()
                        }}
                    />
                </div>
                <h2>Number of incidents: {this.state.incidentCount}</h2>
                <ColumnChart id="column-age" title="Age of patients" data={this.state.age}/>
                <PieChart id="pie-gender" title="Gender of patients" data={this.state.gender}/>
                <PieChart id="pie-gender" title="Activity performed by injured patients" data={this.state.activity}/>
                <ColumnChart id="column-injury-location" title="Location of the injury"
                             data={this.state.injury_location}/>
                <PieChart id="pie-injury-treatment" title="Treatments" data={this.state.treatments}/>
                <ColumnChart id="column-patroller" title="Number of incidents a patroller has responded to"
                             data={this.state.patrollers}/>
                <PieChart id="pie-transport-base" title="How were patients transported to the base"
                          data={this.state.transport_base}/>
                <PieChart id="pie-transport-out" title="How did the patients leave the base"
                          data={this.state.transport_out}/>
                <PieChart id="pie-transport-destination" title="Where did the patients go"
                          data={this.state.destination}/>
                {/*<PieChart id="pie-trp-base" title="Transport from base" data={trp_base} />*/}


            </div>
        )


    }
}

export default withHighcharts(App, Highcharts);
