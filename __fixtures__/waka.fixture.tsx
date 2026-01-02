import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {AggregateFunction, Category, Waka} from "../components/waka"
import { itemLimit, latestYear } from "../misc/constants";

const urlGetter = (year: number)=>(String(year))
const fetcher = (year: string) => {return import(`../assets/waka${year}.json`)}

export default {
    sum: <Waka aggregateFunction={AggregateFunction.sum} limit={itemLimit} category={Category.languages} year={latestYear} urlGetter={urlGetter} fetcher={fetcher}/>,
    average: <Waka aggregateFunction={AggregateFunction.average} limit={itemLimit} category={Category.languages} year={latestYear} urlGetter={urlGetter} fetcher={fetcher}/>,
    median: <Waka aggregateFunction={AggregateFunction.median} limit={itemLimit} category={Category.languages} year={latestYear} urlGetter={urlGetter} fetcher={fetcher}/>,

    editors: <Waka aggregateFunction={AggregateFunction.sum} limit={itemLimit} category={Category.editors} year={latestYear} urlGetter={urlGetter} fetcher={fetcher}/>,
    operating_systems: <Waka aggregateFunction={AggregateFunction.sum} limit={itemLimit} category={Category.operating_systems} year={latestYear} urlGetter={urlGetter} fetcher={fetcher}/>,
};