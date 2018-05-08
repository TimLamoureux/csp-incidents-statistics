import React, { Component } from 'react';

import logo from './logo.svg';
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';


import moment from 'moment';
import DatePicker from 'react-datepicker';

// Data
import Incidents from "./Components/Incidents";
import PieChart from "./Components/PieChart";
import ColumnChart from "./Components/ColumnChart";
import SankeyChart from "./Components/SankeyChart";





// Todo add possibility to filter dates


class App extends Component {
    constructor() {
        super();
        this.state = {
            startDate: moment().startOf('quarter'),
            endDate: moment()
        };
    }

    static capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }



    render() {

        let incidents = new Incidents();
        incidents = incidents.filter( {dateStart: "2017-10-01", dateEnd: "2018-05-31"} );

        // TODO: implement me and sorting order, watchout sort has side effects, it sorts in place
        let sort = (order = "ASC") => {
            //Object.keys(this).sort(function(a,b){return this[a]-this[b]})
            //this.sort();
        }

        let gender = incidents.getOneMetric("gender").toUsableData();
        let age = incidents.getOneMetric("age").groupByNumber("5").toUsableData();
        let activity = incidents.getOneMetric("activity").toUsableData();
        let injury_location = incidents.getOneMetric("injury_location").toUsableData(/*sort*/);
        let treatments = incidents.getOneMetric("treatment").toUsableData();
        let patrollers = incidents.getOneMetric("patrollers").toUsableData();
        let transport_base  = incidents.getOneMetric("transport_base").toUsableData();
        let transport_out  = incidents.getOneMetric("transport_out").toUsableData();
        let destination  = incidents.getOneMetric("destination").toUsableData();



        //incidents.toSankeyData( ["transport_base", "transport_out"], "destination" );

        //let trp = incidents.toSankeyData( ["transport_base", "transport_out", "destination"] );

        return (
            <div>
                <h1>Statistics</h1>
                {/* Create component for date range */}
                {/*<div>*/}
                    {/*<h2>Date Range</h2>*/}
                    {/*From:*/}
                    {/*<DatePicker*/}
                        {/*dateFormat="YYYY/MM/DD"*/}
                        {/*maxDate={moment()}*/}
                        {/*selected={this.state.startDate}*/}
                        {/*onChange={(date) => {alert(date); this.setState({startDate: date})}}*/}
                        {/*todayButton={"Today"}*/}
                    {/*/>*/}
                    {/*To:*/}
                    {/*<DatePicker*/}
                        {/*dateFormat="YYYY/MM/DD"*/}
                        {/*maxDate={moment()}*/}
                        {/*selected={this.state.endDate}*/}
                        {/*onChange={(date) => {alert(date); this.setState({startDate: date})}}*/}
                        {/*todayButton={"Today"}*/}
                    {/*/>*/}
                {/*</div>*/}
                {/*<Incidents startDate={this.state.startDate} endDate={this.state.endDate} />*/}
                <h3>Number of incidents: {incidents.data.length}</h3>
                <ColumnChart id="column-age" title="Age of patients" data={age} />
                <PieChart id="pie-gender" title="Gender of patients" data={gender} />
                <PieChart id="pie-gender" title="Activity performed by injured patients" data={activity} />
                <ColumnChart id="column-injury-location" title="Location of the injury" data={injury_location} />
                <PieChart id="pie-injury-treatment" title="Treatments" data={treatments} />
                <ColumnChart id="column-patroller" title="Number of incidents a patroller has responded to" data={patrollers} />
                <PieChart id="pie-transport-base" title="How were patients transported to the base" data={transport_base} />
                <PieChart id="pie-transport-out" title="How did the patients leave the base" data={transport_out} />
                <PieChart id="pie-transport-destination" title="Where did the patients go" data={destination} />
                {/*<PieChart id="pie-trp-base" title="Transport from base" data={trp_base} />*/}


            </div>
        )





    }
}

export default App;
