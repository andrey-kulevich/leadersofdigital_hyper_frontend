import React from 'react';
import {Line} from 'react-chartjs-2';
import {Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {IChartData} from "../App";
import {beautifyDate} from "../utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartPaper: {
            marginTop: theme.spacing(3),
            padding: theme.spacing(2),
            minHeight: 300,
        }
    }),
);

export const HeartRateChart = ({data}: {data: IChartData}) => {
    const classes = useStyles()

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0
                }
            }]
        }
    }

    const chartData = {
        labels: data.confirmTime.map(elem => beautifyDate(elem)),
        datasets: [
            {
                label: 'Систолическое давление',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgb(255,134,0)',
                borderColor: 'rgb(255,134,0)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.systolic
            },
            {
                label: 'Диастолическое давление',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgb(0,159,255)',
                borderColor: 'rgb(0,159,255)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.diastolic
            },
            {
                label: 'Пульс',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgb(248,104,104)',
                borderColor: 'rgb(248,104,104)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.pulse
            },
        ]
    }

    return (
        <Paper variant='outlined' className={classes.chartPaper}>
            <Line data={chartData} options={options} type={null}/>
        </Paper>
    )
}
