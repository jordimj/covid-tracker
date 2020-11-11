import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalStats } from '../store/actions/actions';
import { RootState } from '../types';
import { DataShowerBox } from './UI/DataShowerBox';
import { Spinner } from './UI/Spinner';

export const GlobalStats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGlobalStats());
  }, []);

  const globalStats = useSelector((state: RootState) => state.globalStats);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);

  return (
    <div>
      {loading && <Spinner loading={loading} />}
      {error?.message}
      {globalStats && (
        <div>
          <DataShowerBox
            kind="total_cases"
            quantity={globalStats.total_cases}
          />
          <DataShowerBox
            kind="total_deaths"
            quantity={globalStats.total_deaths}
          />
          <DataShowerBox
            kind="total_new_cases_today"
            quantity={globalStats.total_new_cases_today}
          />
          <DataShowerBox
            kind="total_new_deaths_today"
            quantity={globalStats.total_new_deaths_today}
          />
          As of {new Date().toLocaleDateString()}
        </div>
      )}
    </div>
  );
};
