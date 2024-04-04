import React, {useEffect, useState} from 'react';
import {ICategory, IStats, IValue} from "../misc/iStats";
import Spinner from "react-bootstrap/Spinner";
import {ListGroup, ProgressBar, Stack} from "react-bootstrap";

interface IStatsView{
    name: string
    value: IValue
}
const readJsonStats = async (year: number): Promise<IStats> =>{

    const stats: IStats = await import(`../assets/waka${year}.json`).then(data=>data.data);
    //console.log(stats)
    return stats;
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
    year = 2023,
    ...props
}: WakaProps)=>{
    const [stats, setStats] = useState<IStats | undefined>(undefined)

    useEffect(()=>{
        setStats(undefined);
        readJsonStats(year).then( (nStats) => setStats(nStats)).catch(()=>{
            console.error(`unable to load year ${year}`)
        });
    },[year])

    if(!stats)
        return (
            <div>
                <Spinner animation="border" role="status" />
                <span /*className="visually-hidden"*/> Loading...</span>
            </div>
        );

    let limit: number
    props.limit ? limit = props.limit : limit = 1000000;

    let categoryStats: ICategory[] = []

    switch (category) {
        case Category.languages:{
            categoryStats = (stats as IStats).languages;
            break;
        }

        case Category.editors:{
            categoryStats = (stats as IStats).editors;
            break;
        }

        case Category.operating_systems:{
            categoryStats = (stats as IStats).operating_systems;
            break;
        }

        default:{
            throw Error(`unknown category: ${category}`)
        }
    }

    const filteredStats: ICategory[] = categoryStats.filter(elem => elem.name != 'Other');
    let values: IStatsView[] = [];

    switch (aggregateFunction) {
        case AggregateFunction.average:{
            values = filteredStats.map(elem => ({ name:elem.name, value: elem.average }) );
            break;
        }

        case AggregateFunction.median:{
            values = filteredStats.map(elem => ({ name:elem.name, value: elem.median }) );
            break;
        }

        case AggregateFunction.sum:{
            values = filteredStats.map(elem => ({ name:elem.name, value: elem.sum }) );
            break;
        }

        default:{
            throw Error(`unknown aggregate function: ${aggregateFunction}`)
        }
    }

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