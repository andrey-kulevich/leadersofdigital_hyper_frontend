import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ISummaryData, ITableData} from "../App";
import {beautifyDate} from "../utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            maxHeight: 250,
        },
        container: {
            maxHeight: 250,
        },
        normal: {
            color: '#000000'
        },
        warning: {
            color: theme.palette.secondary.main,
            fontWeight: 'bold',
            fontSize: 18
        },
    }),
);

export const HeartRateTable = ({data, averageValues}: {data: ITableData[], averageValues: ISummaryData}) => {
    const classes = useStyles()

    return (
        <Paper variant='outlined' className={classes.paper}>
            <TableContainer className={classes.container}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Время</TableCell>
                            <TableCell>Комментарий</TableCell>
                            <TableCell>Систолическое давление</TableCell>
                            <TableCell>Диастолическое давление</TableCell>
                            <TableCell>Пульс</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{beautifyDate(row.confirmTime)}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <span className={Math.abs(row.systolic - averageValues.systolic) > 20 ?
                                        classes.warning : classes.normal}>
                                        {row.systolic}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={Math.abs(row.diastolic - averageValues.diastolic) > 20 ?
                                        classes.warning : classes.normal}>
                                        {row.diastolic}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={Math.abs(row.pulse - averageValues.pulse) > 20 ?
                                        classes.warning : classes.normal}>
                                        {row.pulse}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
