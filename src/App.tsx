import React, {useEffect, useState} from 'react';
import {HeartRateChart} from "./components/HeartRateChart";
import {Container} from "@material-ui/core";
import {HeartRateTable} from "./components/HeartRateTable";
import {HeartRateSummary} from "./components/HeartRateSummary";
import Header from "./components/Header";
import {useHttp} from "./hooks/useHttp";
import {ContentLoader} from "./components/ContentLoader";
import Typography from "@material-ui/core/Typography";

export interface IChartPartialData {
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

export interface ITableData {
    confirmTime: string;
    description: string;
    diastolic: number;
    pulse: number;
    systolic: number;
    arrhythmia: number;
}

// const data: ITableData[] = [
//     {
//         confirmTime: '10:00',
//         description: 'sdsd',
//         diastolic: 99,
//         pulse: 89,
//         systolic: 100,
//         arrhythmia: 55,
//     },
//     {
//         confirmTime: '10:00',
//         description: 'sdsd',
//         diastolic: 98,
//         pulse: 80,
//         systolic: 110,
//         arrhythmia: 55,
//     },
//     {
//         confirmTime: '10:00',
//         description: 'sdsd',
//         diastolic: 90,
//         pulse: 80,
//         systolic: 120,
//         arrhythmia: 55,
//     }
// ]

function App() {
    const [data, setData] = useState<ITableData[]>()
    const { loading, request } = useHttp()
    // const {patientId} = useParams()

    useEffect(() => {
        request(
            'pressure/patient?snils=222-233-446 85',
            'GET',
            null,
            'OTYwODg3MjU1NTpwYXNzd29yZA==').then(res => setData(res))
    }, [])

    const getMaxData = (): IChartPartialData => {
        const tmp = generateChartData();
        return {
            systolic: Math.max.apply(null, tmp.systolic),
            diastolic: Math.max.apply(null, tmp.diastolic),
            pulse: Math.max.apply(null, tmp.pulse),
        }
    }

    const getMinData = (): IChartPartialData => {
        const tmp = generateChartData();
        return {
            systolic: Math.min.apply(null, tmp.systolic),
            diastolic: Math.min.apply(null, tmp.diastolic),
            pulse: Math.min.apply(null, tmp.pulse),
        }
    }

    const getAverageData = (): IChartPartialData => {
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
        if (data) {
            data.forEach((elem) => {
                chartData.confirmTime.push(elem.confirmTime)
                chartData.systolic.push(elem.systolic)
                chartData.diastolic.push(elem.diastolic)
                chartData.pulse.push(elem.pulse)
            })
        }
        return chartData
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
                        <HeartRateChart data={generateChartData()}/>
                        <HeartRateSummary min={getMinData()} max={getMaxData()} average={getAverageData()}/>
                        <HeartRateTable data={data}/>
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
