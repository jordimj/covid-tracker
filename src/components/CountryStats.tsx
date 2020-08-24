import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryStats } from '../store/actions/actions';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import StatsLineChart from './StatsLineChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface RootState {
  countryStats: {};
}

export const CountryStats: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const onButtonClick = (): void => {
    dispatch(fetchCountryStats(countryName));
  };

  const countryStats = useSelector((state: RootState) => state.countryStats);
  console.log(countryStats === {});

  const classes = useStyles();
  const [countryName, setCountryName] = React.useState('ES');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountryName(event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={countryName}
          onChange={handleChange}
          label="Country name"
        >
          <MenuItem value="ES">Spain</MenuItem>
          <MenuItem value="FR">France</MenuItem>
          <MenuItem value="US">United States</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={onButtonClick} variant="contained">
        Fetch stats
      </Button>
      {countryStats && <StatsLineChart countryStats={countryStats} />}
    </div>
  );
};
