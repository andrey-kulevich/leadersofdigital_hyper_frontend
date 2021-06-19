import React, { useState } from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '10em'
		},
	}),
);

export const FiltersPanel = ({filterBy, setFilterBy}: {filterBy: string[], setFilterBy: Function}) => {
	const classes = useStyles();
	const [filter, setFilter] = useState<string>(filterBy[0]);

	return (
		<TextField
			size='small'
			label='Фильтровать по'
			select
			id='selectPeriod'
			variant='outlined'
			value={filter}
			className={classes.root}
			onChange={(e) => {
				setFilterBy(e.target.value)
				setFilter(e.target.value)
			}}
		>
			<MenuItem key={1} value={'week'}>
				Неделя
			</MenuItem>
			<MenuItem key={2} value={'month'}>
				Месяц
			</MenuItem>
			<MenuItem key={3} value={'year'}>
				Год
			</MenuItem>
			<MenuItem key={3} value={'all_time'}>
				Все время
			</MenuItem>
		</TextField>
	);
};
