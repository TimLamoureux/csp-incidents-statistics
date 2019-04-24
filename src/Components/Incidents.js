import incidentsData from '../incidents.json';
import {cloneDeep} from 'lodash';
//import moment from 'moment';
import moment from 'moment';
// import { List } from 'immutable';


/*export default {
    incidents: incidents,
    toSankeyData: (fieldsArray) => {
        let o = Object.assign(incidents);
        return o;
    },
    toUsableData: () => {
        return Object.keys(incidents).reduce(function (acc, key) {
            acc.push({name: key, y: this[key]});
            return acc;
        }, []);
    }
};*/

class Incidents {

    constructor() {

        // incidents represent the imported JSON file
        //for(var k in incidents) {this[k]=incidents[k];}

        this.data = incidentsData;
        //this.state.data = this.data;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    /**
     *
     */
    toSankeyData(fieldsArray) {
        // Todo should be deep copied?
        let o = Object.assign(this.data);

        this.data.reduce( ((acc, incident) => {
            //if ( this === undefined || this[0] === undefined) { return acc; }


            /**
             * Issue is probably coming from bind. Difference between debugger's this and Babel this
             * use function instead of arrow fn see fn groupByNumber
             */
            
            /*let arr = this;

            // Using for loop because pointer of map inside a reduce function was not working properly
            let len = arr.length;
            let i = 0;
            for (i; i<this.length; i++) {
                if (acc[current] === undefined) {
                    acc[current] = {};
                }

                // Last element to append
                if ( array[index+1] === undefined ) {

                }

                if (acc[this[0]] === undefined) {
                    acc[this[0]] = {}
                }
            }

*/



//            acc[this[0]] = ( acc[this[0]] === undefined ? 5 : 2 )

            return acc;
        }).bind(fieldsArray), {});

        return o;
    }

    filter({dateStart = "", dateEnd = ""}) {
        let o = cloneDeep(this);

        o.data = o.data.filter( function(curr) {
            return moment(curr.date).isBetween(
                moment(dateStart),
                moment(dateEnd),
                'days',
                '[]'
            );
        });

        return o;
    }

    // Converts this to an array of Data
    toUsableData(fn) {
        let o = Object.keys(this.data).reduce(function (acc, key) {
            acc.push({name: key, y: this.data[key]});
            return acc;
        }.bind(this), []);

        //result(o, fn, o);

        if ( typeof fn === "function") {
            try {
                o = fn.apply(o);
            }
            catch (e) {
                console.error(e);
            }
        }

        return o;
    };

    getOneMetric(metric) {
        let o = cloneDeep(this);
        o.data = o.data.reduce( (acc, curData) => {
            let key = curData[metric];

            if ( Array.isArray(key) ) {
                for(let i=0; i<key.length; i++) {
                    acc[key[i]] === undefined ? acc[key[i]] = 1 : acc[key[i]] += 1;
                }
            }
            else { acc[key] === undefined ? acc[key] = 1 : acc[key] += 1; }

            return acc;
        }, []);
        return o;
    };

    groupByNumber(rangeSize) {
        let o = cloneDeep(this);
        rangeSize = Number.parseInt(rangeSize);
        o.data = o.data.reduce( function(acc, curData, num) {
            if (curData === undefined) { return acc; }

            let f1 = Math.floor(num/rangeSize)*rangeSize;
            let range = `${f1}-${f1+rangeSize-1}`;

            acc[range] = acc[range] === undefined ? curData : acc[range] += curData;

            return acc;
        }, []);
        return o;
    }

}

export default Incidents;