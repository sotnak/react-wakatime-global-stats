import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {WakaInteractive} from "../components/wakaInteractive";
import { itemLimit } from "../misc/constants";

const urlGetter = (year: number)=>(String(year))
const fetcher = (year: string) => {return import(`../assets/waka${year}.json`)}

export default <WakaInteractive limit={itemLimit} urlGetter={urlGetter} fetcher={fetcher}></WakaInteractive>