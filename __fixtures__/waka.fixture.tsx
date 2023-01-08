import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap/dist/js/bootstrap'
import {AggregateFunction, Waka, WakaProps} from "../components/waka"

export default {
    sum: <Waka aggregateFunction={AggregateFunction.sum} limit={20}/>,
    average: <Waka aggregateFunction={AggregateFunction.average} limit={20}/>,
    median: <Waka aggregateFunction={AggregateFunction.median} limit={20}/>
};