import axios from 'axios';
import { Dispatch } from 'redux';
import * as actionTypes from './types';
import { CountryStatsData, GlobalStatsData } from '../../types';

interface FetchCountryStatsStartAction {
  type: typeof actionTypes.FETCH_COUNTRY_STATS_START;
}

interface FetchCountryStatsSuccessAction {
  type: typeof actionTypes.FETCH_COUNTRY_STATS_SUCCESS;
  payload: {
    timelineitems: { [key: string]: CountryStatsData }[];
  };
}

interface FetchCountryStatsFailAction {
  type: typeof actionTypes.FETCH_COUNTRY_STATS_FAIL;
  error: Error;
}

export type FetchCountryStatsAction =
  | FetchCountryStatsStartAction
  | FetchCountryStatsSuccessAction
  | FetchCountryStatsFailAction;

interface FetchGlobalStatsStartAction {
  type: typeof actionTypes.FETCH_GLOBAL_STATS_START;
}

interface FetchGlobalStatsSuccessAction {
  type: typeof actionTypes.FETCH_GLOBAL_STATS_SUCCESS;
  globalStats: GlobalStatsData;
}

interface FetchGlobalStatsFailAction {
  type: typeof actionTypes.FETCH_GLOBAL_STATS_FAIL;
  error: Error;
}

export type FetchGlobalStatsAction =
  | FetchGlobalStatsStartAction
  | FetchGlobalStatsSuccessAction
  | FetchGlobalStatsFailAction;

const fetchCountryStatsStart = (): FetchCountryStatsStartAction => {
  return {
    type: actionTypes.FETCH_COUNTRY_STATS_START,
  };
};

const fetchCountryStatsSuccess = (data: {
  timelineitems: { [key: string]: CountryStatsData }[];
}): FetchCountryStatsSuccessAction => {
  return {
    type: actionTypes.FETCH_COUNTRY_STATS_SUCCESS,
    payload: data,
  };
};

const fetchCountryStatsFail = (error: Error): FetchCountryStatsFailAction => {
  return {
    type: actionTypes.FETCH_COUNTRY_STATS_FAIL,
    error,
  };
};

export const fetchCountryStats = (countryName: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchCountryStatsStartAction>(fetchCountryStatsStart());

    try {
      const response = await axios.get(
        `https://api.thevirustracker.com/free-api?countryTimeline=${countryName}`
      );

      if (response.data.timelineitems) {
        dispatch<FetchCountryStatsSuccessAction>(
          fetchCountryStatsSuccess(response.data)
        );
      } else {
        dispatch<FetchCountryStatsFailAction>(
          fetchCountryStatsFail(new Error('No data for this country')) // [todo] check when service is up
        );
      }
    } catch (err) {
      dispatch<FetchCountryStatsFailAction>(fetchCountryStatsFail(err));
    }
  };
};

const fetchGlobalStatsStart = () => {
  return {
    type: actionTypes.FETCH_GLOBAL_STATS_START,
  };
};

const fetchGlobalStatsSuccess = (globalStats: {}) => {
  return {
    type: actionTypes.FETCH_GLOBAL_STATS_SUCCESS,
    globalStats,
  };
};

const fetchGlobalStatsFail = (error: Error): FetchGlobalStatsFailAction => {
  return {
    type: actionTypes.FETCH_GLOBAL_STATS_FAIL,
    error,
  };
};

export const fetchGlobalStats = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchGlobalStatsStart());

    try {
      const response = await axios.get(
        'https://api.thevirustracker.com/free-api?global=stats'
      );

      if (response.data) {
        dispatch(fetchGlobalStatsSuccess(response.data.results[0]));
      }
    } catch (err) {
      dispatch<FetchGlobalStatsFailAction>(fetchGlobalStatsFail(err));
    }
  };
};
