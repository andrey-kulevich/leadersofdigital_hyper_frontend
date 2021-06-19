import React from 'react';
import {HeartRateChart} from "./components/HeartRateChart";
import {Container} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {HeartRateTable} from "./components/HeartRateTable";
import {HeartRateSummary} from "./components/HeartRateSummary";
import Header from "./components/Header";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginTop: theme.spacing(3),
        }
    }),
);

export interface IChartPartialData {
    dataHigh: number;
    dataLow: number;
    pulse: number;
}

export interface IChartData {
    labels: string[];
    dataHigh: number[];
    dataLow: number[];
    pulse: number[];
}

export type ITableData = {
    label: string;
    dataHigh: number;
    dataLow: number;
    pulse: number;
}[];

const data: IChartData = {
    labels: [
        '1 марта 10:30', '1 марта 11:30', '2 марта 12:10', '2 марта 13:30',
        '4 марта 13:30', '5 марта 13:30', '6 марта 13:30'
    ],
    dataHigh: [120, 130, 110, 105, 100, 123, 101],
    dataLow: [90, 91, 92, 93, 94, 80, 82],
    pulse: [89, 90, 91, 100, 76, 88, 99]
}

const getMaxData = (): IChartPartialData => {
    return {
        dataHigh: Math.max.apply(null, data.dataHigh),
        dataLow: Math.max.apply(null, data.dataLow),
        pulse: Math.max.apply(null, data.pulse),
    }
}

const getMinData = (): IChartPartialData => {
    return {
        dataHigh: Math.min.apply(null, data.dataHigh),
        dataLow: Math.min.apply(null, data.dataLow),
        pulse: Math.min.apply(null, data.pulse),
    }
}

const getAverageData = (): IChartPartialData => {
    return {
        dataHigh: Math.floor(data.dataHigh.reduce((a, b) => a + b, 0) / data.dataHigh.length),
        dataLow: Math.floor(data.dataLow.reduce((a, b) => a + b, 0) / data.dataLow.length),
        pulse: Math.floor(data.pulse.reduce((a, b) => a + b, 0) / data.pulse.length),
    }
}

const generateTableData = (): ITableData => {
    const values: ITableData = []
    data.labels.forEach((elem, index) => {
        values.push({
            label: elem,
            dataHigh: data.dataHigh[index],
            dataLow: data.dataLow[index],
            pulse: data.pulse[index],
        })
    })
    return values
}

function App() {
    const classes = useStyles()

    return (
        <>
            <Header/>
            <Container>
                <HeartRateChart data={data}/>
                <HeartRateSummary min={getMinData()} max={getMaxData()} average={getAverageData()}/>
                <HeartRateTable data={generateTableData()}/>
            </Container>
        </>
    );
}

export default App;
