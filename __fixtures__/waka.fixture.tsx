import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {AggregateFunction, Category, Waka} from "../components/waka"
import { itemLimit, latestYear } from "../misc/constants";

export default {
    sum: <Waka aggregateFunction={AggregateFunction.sum} limit={itemLimit} category={Category.languages} year={latestYear}/>,
    average: <Waka aggregateFunction={AggregateFunction.average} limit={itemLimit} category={Category.languages} year={latestYear}/>,
    median: <Waka aggregateFunction={AggregateFunction.median} limit={itemLimit} category={Category.languages} year={latestYear}/>,

    editors: <Waka aggregateFunction={AggregateFunction.sum} limit={itemLimit} category={Category.editors} year={latestYear}/>,
    operating_systems: <Waka aggregateFunction={AggregateFunction.sum} limit={itemLimit} category={Category.operating_systems} year={latestYear}/>,
};