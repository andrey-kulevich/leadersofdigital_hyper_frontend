import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ITableData} from "../App";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            maxHeight: 250,
        },
        container: {
            maxHeight: 250,
        }
    }),
);

export const HeartRateTable = ({data}: {data: ITableData[]}) => {
    const classes = useStyles()

    return (
        <Paper variant='outlined' className={classes.paper}>
            <TableContainer className={classes.container}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Время</TableCell>
                            <TableCell>Систолическое давление</TableCell>
                            <TableCell>Диастолическое давление</TableCell>
                            <TableCell>Пульс</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.confirmTime}</TableCell>
                                <TableCell>{row.systolic}</TableCell>
                                <TableCell>{row.diastolic}</TableCell>
                                <TableCell>{row.pulse}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
