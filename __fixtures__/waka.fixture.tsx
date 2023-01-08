import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {AggregateFunction, Category, Waka} from "../components/waka"

export default {
    sum: <Waka aggregateFunction={AggregateFunction.sum} limit={20} category={Category.languages} year={2022}/>,
    average: <Waka aggregateFunction={AggregateFunction.average} limit={20} category={Category.languages} year={2022}/>,
    median: <Waka aggregateFunction={AggregateFunction.median} limit={20} category={Category.languages} year={2022}/>,

    editors: <Waka aggregateFunction={AggregateFunction.sum} limit={20} category={Category.editors} year={2022}/>,
    operating_systems: <Waka aggregateFunction={AggregateFunction.sum} limit={20} category={Category.operating_systems} year={2022}/>,
};