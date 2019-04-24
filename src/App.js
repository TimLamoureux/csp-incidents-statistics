import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';


import moment from 'moment';
import DatePicker from 'react-datepicker';

// Data
import Incidents from "./Components/Incidents";
import PieChart from "./Components/PieChart";
import ColumnChart from "./Components/ColumnChart";
//import SankeyChart from "./Components/SankeyChart";





// Todo add possibility to filter dates


class App extends Component {

    constructor() {
        super();
        this.state = {
            dateFormat: 'YYYY/MM/DD',
            startDate: moment().startOf('year'),
            endDate: moment(),
            rawIncidents: new Incidents()
        };

        this.refreshData();
    }

    static capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    refreshData() {
        this.state.incidents = this.state.rawIncidents.filter( {
            dateStart: this.state.startDate,
            dateEnd: this.state.endDate
        } );
        let incidents = this.state.incidents;

        this.state.gender = incidents.getOneMetric("gender").toUsableData();
        this.state.age = incidents.getOneMetric("age").groupByNumber("5").toUsableData();
        this.state.activity = incidents.getOneMetric("activity").toUsableData();
        this.state.injury_location = incidents.getOneMetric("injury_location").toUsableData(/*sort*/);
        this.state.treatments = incidents.getOneMetric("treatment").toUsableData();
        this.state.patrollers = incidents.getOneMetric("patrollers").toUsableData();
        this.state.transport_base  = incidents.getOneMetric("transport_base").toUsableData();
        this.state.transport_out  = incidents.getOneMetric("transport_out").toUsableData();
        this.state.destination  = incidents.getOneMetric("destination").toUsableData();
    }



    render() {

        //let incidents = new Incidents();
        //incidents = incidents.filter( {dateStart: "2018-10-01", dateEnd: "2019-05-31"} );

        // TODO: implement me and sorting order, watchout sort has side effects, it sorts in place
        // let sort = (order = "ASC") => {
        //     //Object.keys(this).sort(function(a,b){return this[a]-this[b]})
        //     //this.sort();
        // }



        //incidents.toSankeyData( ["transport_base", "transport_out"], "destination" );

        //let trp = incidents.toSankeyData( ["transport_base", "transport_out", "destination"] );

        return (
            <div>
                <h1>Statistics</h1>
                <div>
                    Between &nbsp;
                    <DatePicker
                        dateFormat={this.state.dateFormat}
                        maxDate={moment()}
                        selected={this.state.startDate}
                        onChange={(date) => {
                            this.setState({
                                startDate: date
                            }, () => {
                                console.log(`Updated Start Time (${date.format()}). Calling refresh.`);
                                this.refreshData();
                            });
                        }}
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={5}
                        todayButton={"Today"}
                        inline
                    />
                    &nbsp;and&nbsp;
                    <DatePicker
                        dateFormat={this.state.dateFormat}
                        maxDate={moment()}
                        selected={this.state.endDate}
                        onChange={(date) => {
                            this.setState({
                                endDate: date
                            }, () => {
                                console.log(`Updated Start Time (${date.format()}). Calling refresh.`);
                                this.refreshData();
                            });
                        }}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={5}
                        todayButton={"Today"}
                        inline
                    />
                </div>
                <h2>Number of incidents: {this.state.incidents.data.length}</h2>
                <ColumnChart id="column-age" title="Age of patients" data={this.state.age} />
                <PieChart id="pie-gender" title="Gender of patients" data={this.state.gender} />
                <PieChart id="pie-gender" title="Activity performed by injured patients" data={this.state.activity} />
                <ColumnChart id="column-injury-location" title="Location of the injury" data={this.state.injury_location} />
                <PieChart id="pie-injury-treatment" title="Treatments" data={this.state.treatments} />
                <ColumnChart id="column-patroller" title="Number of incidents a patroller has responded to" data={this.state.patrollers} />
                <PieChart id="pie-transport-base" title="How were patients transported to the base" data={this.state.transport_base} />
                <PieChart id="pie-transport-out" title="How did the patients leave the base" data={this.state.transport_out} />
                <PieChart id="pie-transport-destination" title="Where did the patients go" data={this.state.destination} />
                {/*<PieChart id="pie-trp-base" title="Transport from base" data={trp_base} />*/}


            </div>
        )





    }
}

export default App;
