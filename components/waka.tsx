import React, {useState} from 'react';
import {IStats} from "../misc/iStats";
import Spinner from "react-bootstrap/Spinner";
import {ListGroup, ProgressBar, Stack} from "react-bootstrap";

const fun = async (): Promise<IStats> =>{
    // @ts-ignore
    const {default: stats} = await import("../assets/waka2022.json");
    return stats.data as IStats;
}

export enum AggregateFunction {
    sum,
    average,
    median
}

interface WakaProps {
    aggregateFunction: AggregateFunction
    limit: number|undefined
}

export const Waka = ({
                         aggregateFunction = AggregateFunction.sum,
    ...props
}: WakaProps)=>{
    const [stats, setStats] = useState(undefined)
    // @ts-ignore
    fun().then( (nStats) => setStats(nStats))

    if(!stats)
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    let limit: number
    props.limit ? limit = props.limit : limit = 1000000;

    let aggName: string = "";

    if(aggregateFunction == AggregateFunction.average)
        aggName = "average"

    if(aggregateFunction == AggregateFunction.median)
        aggName = "median"

    if(aggregateFunction == AggregateFunction.sum)
        aggName = "sum"

    // @ts-ignore
    const sortedStats = (stats as IStats).languages
        .filter(lang => lang.name != "Other")
        .sort((a,b) => b[aggName].seconds - a[aggName].seconds )
        .slice(0,limit)

    let maxValue: number;
    // @ts-ignore
    sortedStats[0] ? maxValue = sortedStats[0][aggName].seconds : 0

    // @ts-ignore
    const items = sortedStats
        .map(lang =>
            <ListGroup.Item key={lang.name}>
                <Stack direction="horizontal" gap={3}>
                    <div>{lang.name}</div>
                    <div className="ms-auto">{lang[aggName].text}</div>
                </Stack>
                <ProgressBar max={maxValue} now={lang[aggName].seconds}></ProgressBar>
            </ListGroup.Item>);

    return (
        <>
            <h3>{aggName.toUpperCase()}</h3>
            <ListGroup>{items}</ListGroup>
        </>
    );
}