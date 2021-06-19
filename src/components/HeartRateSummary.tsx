import React from 'react';
import {
    Grid, List, ListItem, ListItemIcon, ListItemText,
    Paper,
    Typography,
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ISummaryData} from "../App";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            padding: theme.spacing(2),
            minHeight: 50
        },
    }),
);

export const HeartRateSummary = (
    {min, max, average}: { min: ISummaryData, max: ISummaryData, average: ISummaryData }) => {
    const classes = useStyles()

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container direction='row' spacing={2}>
                <Grid item xs={4}>
                    <Paper variant='outlined'>
                        <Typography variant='h6' align='center'>Систолическое давление</Typography>
                        <List dense>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingUpIcon color='secondary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Максимальное - ' + max.systolic}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingDownIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Минимальное - ' + min.systolic}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingFlatIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Среднее - ' + average.systolic}/>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper variant='outlined'>
                        <Typography variant='h6' align='center'>Диастолическое давление</Typography>
                        <List dense>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingUpIcon color='secondary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Максимальное - ' + max.diastolic}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingDownIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Минимальное - ' + min.diastolic}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingFlatIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Среднее - ' + average.diastolic}/>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper variant='outlined'>
                        <Typography variant='h6' align='center'>Пульс</Typography>
                        <List dense>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingUpIcon color='secondary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Максимальный - ' + max.pulse}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingDownIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Минимальный - ' + min.pulse}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingFlatIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Средний - ' + average.pulse}/>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}
