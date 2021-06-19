import React, {useEffect, useState} from 'react';
import {HeartRateChart} from "./components/HeartRateChart";
import {Container} from "@material-ui/core";
import {HeartRateTable} from "./components/HeartRateTable";
import {HeartRateSummary} from "./components/HeartRateSummary";
import Header from "./components/Header";
import {useHttp} from "./hooks/useHttp";
import {ContentLoader} from "./components/ContentLoader";
import Typography from "@material-ui/core/Typography";
import {FiltersPanel} from "./components/FiltersPanel";
import {dateDiff} from "./utils";

export interface ISummaryData {
    systolic: number;
    diastolic: number;
    pulse: number;
}

export interface IChartData {
    confirmTime: string[];
    systolic: number[];
    diastolic: number[];
    pulse: number[];
}

export interface IChartDeviationsData {
    systolicDeviation: number[];
    diastolicDeviation: number[];
    pulseDeviation: number[];
}

export interface ITableData {
    confirmTime: string;
    description: string;
    diastolic: number;
    pulse: number;
    systolic: number;
    arrhythmia: number;
}

function App() {
    const [data, setData] = useState<ITableData[]>([])
    const [filteredData, setFilteredData] = useState<ITableData[]>([])
    const {loading, request} = useHttp()

    useEffect(() => {
        request(
            'pressure/patient?snils=' + document.URL.substr(document.URL.length - 16),
            'GET',
            null,
            'OTYwODg3MjU1NTpwYXNzd29yZA==')
            .then((res: ITableData[]) => {
                let reformatted = res
                reformatted = reformatted.filter(elem => elem.diastolic > 30 && elem.systolic > 50 && elem.pulse > 40)
                setData(reformatted)
            }
        )
    }, [])

    useEffect(() => {
        setFilterBy('week')
    }, [data])

    const setFilterBy = (filterBy: string) => {
        switch (filterBy) {
            case 'week':
                setFilteredData(data.filter(elem => dateDiff(new Date(elem.confirmTime), new Date()) < 7));
                break;
            case 'month':
                setFilteredData(data.filter(elem => new Date(elem.confirmTime).getMonth() === new Date().getMonth()));
                break;
            case 'year':
                setFilteredData(data.filter(elem => new Date(elem.confirmTime).getFullYear() === new Date().getFullYear()));
                break;
            case 'all_time':
                setFilteredData(data);
        }
    }

    const getMaxData = (): ISummaryData => {
        const tmp = generateChartData();
        return {
            systolic: Math.max.apply(null, tmp.systolic),
            diastolic: Math.max.apply(null, tmp.diastolic),
            pulse: Math.max.apply(null, tmp.pulse),
        }
    }

    const getMinData = (): ISummaryData => {
        const tmp = generateChartData();
        return {
            systolic: Math.min.apply(null, tmp.systolic),
            diastolic: Math.min.apply(null, tmp.diastolic),
            pulse: Math.min.apply(null, tmp.pulse),
        }
    }

    const getAverageData = (): ISummaryData => {
        const tmp = generateChartData();
        return {
            systolic: Math.floor(tmp.systolic.reduce((a, b) => a + b, 0) / tmp.systolic.length),
            diastolic: Math.floor(tmp.diastolic.reduce((a, b) => a + b, 0) / tmp.diastolic.length),
            pulse: Math.floor(tmp.pulse.reduce((a, b) => a + b, 0) / tmp.pulse.length),
        }
    }

    const generateChartData = (): IChartData => {
        const chartData: IChartData = {
            confirmTime: [],
            systolic: [],
            diastolic: [],
            pulse: [],
        }
        if (filteredData) {
            filteredData.forEach((elem) => {
                chartData.confirmTime.push(elem.confirmTime)
                chartData.systolic.push(elem.systolic)
                chartData.diastolic.push(elem.diastolic)
                chartData.pulse.push(elem.pulse)
            })
        }
        return chartData
    }

    const generateDeviationsData = (): IChartDeviationsData => {
        const average = getAverageData();
        const deviations: IChartDeviationsData = {
            systolicDeviation: [],
            diastolicDeviation: [],
            pulseDeviation: [],
        }
        if (filteredData) {
            filteredData.forEach((elem) => {
                if (Math.abs(elem.systolic - average.systolic) > 20) deviations.systolicDeviation.push(elem.systolic)
                else deviations.systolicDeviation.push(0)
                if (Math.abs(elem.diastolic - average.diastolic) > 20) deviations.diastolicDeviation.push(elem.diastolic)
                else deviations.diastolicDeviation.push(0)
                if (Math.abs(elem.pulse - average.pulse) > 20) deviations.pulseDeviation.push(elem.pulse)
                else deviations.pulseDeviation.push(0)
            })
        }
        return deviations
    }

    return (
        loading ?
            <ContentLoader message={'Идет загрузка данных...'}/>
            :
            <>
                {data ?
                    <>
                        <Header/>
                        <Container>
                            <FiltersPanel filterBy={['week', 'month', 'year', 'all_time']} setFilterBy={setFilterBy}/>
                            <HeartRateChart data={generateChartData()} deviations={generateDeviationsData()}/>
                            <HeartRateSummary min={getMinData()} max={getMaxData()} average={getAverageData()}/>
                            <HeartRateTable data={filteredData} averageValues={getAverageData()}/>
                        </Container>
                    </>
                    :
                    <Container>
                        <Typography variant='h5' align='center'>
                            Не удалось загрузить данные, проверьте правильность ссылки
                        </Typography>
                    </Container>
                }
            </>
    );
}

export default App;
