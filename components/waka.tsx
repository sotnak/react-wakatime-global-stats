import React, {useState} from 'react';
import {ICategory, IStats, IValue} from "../misc/iStats";
import Spinner from "react-bootstrap/Spinner";
import {ListGroup, ProgressBar, Stack} from "react-bootstrap";

interface IStatsView{
    name: string
    value: IValue
}
const fun = async (year: number): Promise<IStats> =>{

    // @ts-ignore
    const {default: stats} = await import(`../assets/waka${year}.json`);
    return stats.data as IStats;
}

export enum AggregateFunction {
    sum,
    average,
    median
}

export enum Category{
    languages,
    editors,
    operating_systems
}

export interface WakaProps {
    aggregateFunction: AggregateFunction
    category: Category
    year: number
    limit: number|undefined
}

export const Waka = ({
                         aggregateFunction = AggregateFunction.sum,
    category = Category.languages,
    year = 2022,
    ...props
}: WakaProps)=>{
    const [stats, setStats] = useState(undefined)
    // @ts-ignore
    fun(year).then( (nStats) => setStats(nStats)).catch(()=>{
        setStats(undefined)
    })

    if(!stats)
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    let limit: number
    props.limit ? limit = props.limit : limit = 1000000;

    let categoryStats: ICategory[] = []

    if(category == Category.languages)
        categoryStats = (stats as IStats).languages;

    if(category == Category.editors)
        categoryStats = (stats as IStats).editors;

    if(category == Category.operating_systems)
        categoryStats = (stats as IStats).operating_systems;

    const filteredStats: ICategory[] = categoryStats.filter(elem => elem.name != 'Other');
    let values: IStatsView[] = [];

    if(aggregateFunction == AggregateFunction.average)
        values = filteredStats.map(elem => ({ name:elem.name, value: elem.average }) );

    if(aggregateFunction == AggregateFunction.median)
        values = filteredStats.map(elem => ({ name:elem.name, value: elem.median }) );

    if(aggregateFunction == AggregateFunction.sum)
        values = filteredStats.map(elem => ({ name:elem.name, value: elem.sum }) );

    const sortedValues = values
        .sort((a,b) => b.value.seconds - a.value.seconds )
        .slice(0,limit)

    let maxValue: number;
    sortedValues[0] ? maxValue = sortedValues[0].value.seconds : 0

    const items = sortedValues
        .map(lang =>
            <ListGroup.Item key={lang.name}>
                <Stack direction="horizontal" gap={3}>
                    <div>{lang.name}</div>
                    <div className="ms-auto">{lang.value.text}</div>
                </Stack>
                <ProgressBar max={maxValue} now={lang.value.seconds}></ProgressBar>
            </ListGroup.Item>);

    return (
        <>
            <ListGroup>{items}</ListGroup>
        </>
    );
}