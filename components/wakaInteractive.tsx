import React, {useState} from "react";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {AggregateFunction, Waka} from "./waka";

export const WakaInteractive = ()=>{
    const [aggFun, setAggFun] = useState(AggregateFunction.sum)

    const handleAggChange = (agg: AggregateFunction)=>{
        setAggFun(agg)
    }

    return (
        <>
            <ToggleButtonGroup type="radio" name="options" defaultValue={AggregateFunction.sum} onChange={handleAggChange}>
                <ToggleButton id="tbg-radio-1" value={AggregateFunction.sum}>
                    Sum
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={AggregateFunction.average}>
                    Average
                </ToggleButton>
                <ToggleButton id="tbg-radio-3" value={AggregateFunction.median}>
                    Median
                </ToggleButton>
            </ToggleButtonGroup>
            <Waka aggregateFunction={aggFun} limit={20}/>
        </>
    )
}