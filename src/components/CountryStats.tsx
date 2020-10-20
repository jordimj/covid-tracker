import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryStats } from '../store/actions/actions';
import { StatsLineChart } from './StatsLineChart';
import { GetIsMobile } from '../utils/helpers';
import { useWindowSize } from '../utils/useWindowSize';
import { TimespanRadios } from './TimespanRadios';
import { DatasetCheckboxes } from './DatasetCheckboxes';
import { CountryDropdown } from '../shared/CountryDropdown';
import { Spinner } from '../shared/Spinner';
import { RootState } from '../store/reducer';
import CSS from 'csstype';
import { GroupByRadio } from './GroupByRadio';
import { GroupByOptions } from './GroupByRadio';

export const CountryStats: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const countryStats = useSelector((state: RootState) => state.countryStats);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);
  const [countryName, setCountryName] = React.useState('');

  const [show, setShow] = React.useState({
    newDailyCases: true,
    newDailyDeaths: true,
    totalCases: true,
    totalRecoveries: true,
    totalDeaths: true,
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newCountry = event.target.value as string;
    setCountryName(newCountry);
    dispatch(fetchCountryStats(newCountry));
  };

  const isMobile = GetIsMobile();
  const windowSize = useWindowSize();

  const [timespan, setTimespan] = React.useState<string>('month');
  const [groupBy, setGroupBy] = React.useState<GroupByOptions>('week');

  const flexStyle: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  };

  return (
    <div style={flexStyle}>
      <CountryDropdown
        countryName={countryName}
        handleChange={handleChange}
        isMobile={isMobile}
      />
      <TimespanRadios
        timespan={timespan}
        setTimespan={setTimespan}
        isMobile={isMobile}
      />
      <GroupByRadio
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        isMobile={isMobile}
      />
      <DatasetCheckboxes show={show} setShow={setShow} isMobile={isMobile} />

      {loading && <Spinner loading={loading} />}
      {error === 'No data' && 'No data for this country'}
      {countryStats && !loading && (
        <StatsLineChart
          countryStats={countryStats}
          timespan={timespan}
          groupBy={groupBy}
          show={show}
          isMobile={isMobile}
          windowSize={windowSize}
        />
      )}
    </div>
  );
};
