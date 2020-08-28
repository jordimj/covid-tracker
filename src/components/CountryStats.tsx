import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryStats } from '../store/actions/actions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import StatsLineChart from './StatsLineChart';
import { CountryStatsData } from '../shared/CountryStatsData';
import { CountryList } from '../shared/CountryList';
import { GetIsMobile } from '../utils/helpers';
import { useWindowSize } from '../utils/useWindowSize';
import { TimespanRadios } from './TimespanRadios';

interface RootState {
  countryStats?: {
    [key: string]: CountryStatsData;
  };
}

export const CountryStats: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const countryStats = useSelector((state: RootState) => state.countryStats);
  const [countryName, setCountryName] = React.useState('ES');

  // const onButtonClick = (): void => {
  //   dispatch(fetchCountryStats(countryName));
  // };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newCountry = event.target.value as string;
    setCountryName(newCountry);
    dispatch(fetchCountryStats(newCountry));
  };

  const getMenuItems = (): JSX.Element[] => {
    let items: JSX.Element[] = [];
    for (const [country, code] of Object.entries(CountryList)) {
      items.push(
        <MenuItem key={code} value={code}>
          {country}
        </MenuItem>
      );
    }
    return items;
  };

  const isMobile = GetIsMobile();
  const windowSize = useWindowSize();

  const [timespan, setTimespan] = React.useState<string>('month');

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={countryName}
          onChange={handleChange}
          label="Country name"
        >
          {getMenuItems()}
        </Select>
      </FormControl>
      {/* <Button onClick={onButtonClick} variant="contained">
        Fetch stats
      </Button> */}
      <TimespanRadios timespan={timespan} setTimespan={setTimespan} />
      {countryStats && (
        <StatsLineChart
          countryStats={countryStats}
          timespan={timespan}
          isMobile={isMobile}
          windowSize={windowSize}
        />
      )}
    </div>
  );
};
