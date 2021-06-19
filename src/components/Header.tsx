import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			marginBottom: theme.spacing(2),
		},
	}),
);

export default function Header(): JSX.Element {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static' color='transparent'>
				<Toolbar variant='dense'>
					<Container>
						<Typography variant='h5'>
							Вася Пупкин: сердечные показатели
						</Typography>
					</Container>
				</Toolbar>
			</AppBar>
		</div>
	);
}
