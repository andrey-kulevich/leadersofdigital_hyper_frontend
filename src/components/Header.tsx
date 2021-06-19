// @ts-nocheck
import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, Container, Grid} from "@material-ui/core";
import {useHttp} from "../hooks/useHttp";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TelegramIcon from '@material-ui/icons/Telegram';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			marginBottom: theme.spacing(2),
		},
		icon: {
			marginTop: theme.spacing(0.5)
		},
		link: {
			textDecoration: 'none'
		}
	}),
);

export default function Header(): JSX.Element {
	const classes = useStyles();
	const [user, setUser] = useState()
	const { request } = useHttp()

	useEffect(() => {
		request(
			'users/user?snils=' + document.URL.substr(document.URL.length - 16),
			'GET',
			null,
			'OTYwODg3MjU1NTpwYXNzd29yZA==').then(res => setUser(res))
	}, [])

	return (
		<div className={classes.root}>
			<AppBar position='static' color='transparent'>
				<Toolbar variant='dense'>
					<Container>
						{user ?
							<Grid container direction='row' spacing={2} justify="space-between">
								<Grid item>
									<Grid container direction='row' spacing={2}>
										<Grid item>
											<Typography variant='h5'>
												{user.firstName} {user.lastName}: сердечные показатели
											</Typography>
										</Grid>
										<Grid item>
											<FavoriteBorderIcon color='secondary' className={classes.icon}/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<Button
										className={classes.button}
										startIcon={<TelegramIcon color='primary'>send</TelegramIcon>}
									>
										<a className={classes.link} href={`https://telegram.me/${user.telegramUsername}`}>
											Открыть в телеграме
										</a>
									</Button>
								</Grid>
							</Grid>
							: ''
						}
					</Container>
				</Toolbar>
			</AppBar>
		</div>
	);
}
