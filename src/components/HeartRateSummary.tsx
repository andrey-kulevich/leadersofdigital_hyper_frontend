import React, {useEffect, useState} from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {IChartPartialData} from "../App";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            padding: theme.spacing(2),
            minHeight: 50
        }
    }),
);

export const HeartRateSummary = (
    {min, max, average}: {min: IChartPartialData, max: IChartPartialData, average: IChartPartialData}) => {
    const classes = useStyles()

    return (
        <Paper variant='outlined' className={classes.root}>
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Систолическое давление</TableCell>
                            <TableCell>Диастолическое давление</TableCell>
                            <TableCell>Пульс</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={1}>
                            <TableCell>Минимальное</TableCell>
                            <TableCell>{min.dataHigh}</TableCell>
                            <TableCell>{min.dataLow}</TableCell>
                            <TableCell>{min.pulse}</TableCell>
                        </TableRow>
                        <TableRow key={2}>
                            <TableCell>Максимальное</TableCell>
                            <TableCell>{max.dataHigh}</TableCell>
                            <TableCell>{max.dataLow}</TableCell>
                            <TableCell>{max.pulse}</TableCell>
                        </TableRow>
                        <TableRow key={3}>
                            <TableCell>Среднее</TableCell>
                            <TableCell>{average.dataHigh}</TableCell>
                            <TableCell>{average.dataLow}</TableCell>
                            <TableCell>{average.pulse}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
