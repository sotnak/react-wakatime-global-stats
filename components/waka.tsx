import React from 'react';
import {ICategory, IStats, IValue} from "../misc/iStats";
import Spinner from "react-bootstrap/Spinner";
import {ListGroup, ProgressBar, Stack} from "react-bootstrap";
import useSWR from 'swr'
import axios from 'axios'


const defaultFetcher = (url: string) => axios.get(url).then(res => res.data)

interface IStatsView{
    name: string
    value: IValue
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

export type UrlGetter = (year: number) => string;

interface WakaProps {
  aggregateFunction?: AggregateFunction;
  category?: Category;
  year?: number;
  urlGetter: UrlGetter;
  fetcher?: ((url: string) => Promise<any>);
  limit: number | undefined;
}

export const Waka = ({
    aggregateFunction = AggregateFunction.sum,
    category = Category.languages,
    year = 2023,
    urlGetter,
    fetcher = defaultFetcher,
    ...props
}: WakaProps)=>{
    const { data, error, isLoading } = useSWR(urlGetter(year), fetcher)

    if(isLoading)
        return (
            <div>
                <Spinner animation="border" role="status" />
                <span /*className="visually-hidden"*/> Loading...</span>
            </div>
        );

    if(error)
        return (
            <div>
                <span /*className="visually-hidden"*/>{error.message}</span>
            </div>
        );

    const stats: IStats = data.data

    let limit: number
    props.limit ? limit = props.limit : limit = 1000000;

    let categoryStats: ICategory[] = []

    switch (category) {
        case Category.languages:{
            categoryStats = stats.languages;
            break;
        }

        case Category.editors:{
            categoryStats = stats.editors;
            break;
        }

        case Category.operating_systems:{
            categoryStats = stats.operating_systems;
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