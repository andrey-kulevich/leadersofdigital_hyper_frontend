import React, {useEffect, useState} from 'react';
import {
    Grid, List, ListItem, ListItemIcon, ListItemText,
    Paper,
    Typography,
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {IChartPartialData} from "../App";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            padding: theme.spacing(2),
            minHeight: 50
        },
        card: {
            //margin: theme.spacing(0.5),
        }
    }),
);

export const HeartRateSummary = (
    {min, max, average}: { min: IChartPartialData, max: IChartPartialData, average: IChartPartialData }) => {
    const classes = useStyles()

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container direction='row' spacing={2}>
                <Grid item xs={4} className={classes.card}>
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
                                <ListItemText primary={'Максимальное - ' + min.systolic}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FavoriteIcon color='secondary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Максимальное - ' + average.systolic}/>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={4} className={classes.card}>
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
                                <ListItemText primary={'Максимальное - ' + min.diastolic}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FavoriteIcon color='secondary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Максимальное - ' + average.diastolic}/>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={4} className={classes.card}>
                    <Paper variant='outlined'>
                        <Typography variant='h6' align='center'>Пульс</Typography>
                        <List dense>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingUpIcon color='secondary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Максимальное - ' + max.pulse}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <TrendingDownIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Максимальное - ' + min.pulse}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FavoriteIcon color='secondary'/>
                                </ListItemIcon>
                                <ListItemText primary={'Максимальное - ' + average.pulse}/>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}
