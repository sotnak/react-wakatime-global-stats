import React, {useState} from "react";
import {Pagination, Stack, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {UrlGetter, AggregateFunction, Category, Waka} from "./waka";

import "./wakaInteractive.css"
import { firstYear, itemLimit } from "../misc/constants";

const latestYear = Math.max(firstYear, new Date().getFullYear() - 1);

export const WakaInteractive = ({
    limit = itemLimit,
    urlGetter,
    fetcher
}: {
    limit: number,
    urlGetter: UrlGetter,
    fetcher?: ((url: string) => Promise<any>)
})=>{
    const [aggFun, setAggFun] = useState<AggregateFunction>(AggregateFunction.sum);
    const [category, setCategory] = useState<Category>(Category.languages);
    const [year, setYear] = useState<number>(latestYear)

    const handleAggChange = (agg: AggregateFunction)=>{
        setAggFun(agg);
    }

    const handleCategoryChange = (cat: Category)=>{
        setCategory(cat);
    }

    const handleYearChange = (yr: number)=>{
        setYear(yr);
    }

    let items = [];
    for (let number = firstYear; number <= latestYear; number++) {
        items.push(
            <Pagination.Item key={number} active={number === year} onClick={()=>{handleYearChange(number)} }>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Stack id="full">
            <Stack direction="horizontal" gap={3}>
                <ToggleButtonGroup type="radio" name="agg options" defaultValue={AggregateFunction.sum} onChange={handleAggChange}>
                    <ToggleButton id="tbg-agg-1" value={AggregateFunction.sum}>
                        Sum
                    </ToggleButton>
                    <ToggleButton id="tbg-agg-2" value={AggregateFunction.average}>
                        Average
                    </ToggleButton>
                    <ToggleButton id="tbg-agg-3" value={AggregateFunction.median}>
                        Median
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup className="ms-auto" type="radio" name="category options" defaultValue={Category.languages} onChange={handleCategoryChange}>
                    <ToggleButton id="tbg-category-1" variant="success" value={Category.languages}>
                        Languages
                    </ToggleButton>
                    <ToggleButton id="tbg-category-2" variant="success" value={Category.editors}>
                        Editors
                    </ToggleButton>
                    <ToggleButton id="tbg-category-3" variant="success" value={Category.operating_systems}>
                        Operating Systems
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <div id="wakaContainer">
                <Waka aggregateFunction={aggFun} limit={limit} category={category} year={year} urlGetter={urlGetter} fetcher={fetcher}/>
            </div>

            <Pagination className="center">{items}</Pagination>
        </Stack>
    )
}