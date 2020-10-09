import axios from 'axios';
import { Dispatch } from 'redux';
import {
  FETCH_COUNTRY_STATS_START,
  FETCH_COUNTRY_STATS_SUCCESS,
  FETCH_COUNTRY_STATS_FAIL,
} from './types';
import { CountryStatsData } from '../../shared/CountryStatsData';

interface FetchCountryStatsStartAction {
  type: typeof FETCH_COUNTRY_STATS_START;
}

interface FetchCountryStatsSuccessAction {
  type: typeof FETCH_COUNTRY_STATS_SUCCESS;
  payload: {
    timelineitems: { [key: string]: CountryStatsData }[];
  };
}

interface FetchCountryStatsFailAction {
  type: typeof FETCH_COUNTRY_STATS_FAIL;
  error: Error | string;
}

export type FetchCountryStatsAction =
  | FetchCountryStatsStartAction
  | FetchCountryStatsSuccessAction
  | FetchCountryStatsFailAction;

const fetchCountryStatsStart = (): FetchCountryStatsStartAction => {
  return {
    type: FETCH_COUNTRY_STATS_START,
  };
};

const fetchCountryStatsSuccess = (data: {
  timelineitems: { [key: string]: CountryStatsData }[];
}): FetchCountryStatsSuccessAction => {
  return {
    type: FETCH_COUNTRY_STATS_SUCCESS,
    payload: data,
  };
};

const fetchCountryStatsFail = (
  error: Error | string
): FetchCountryStatsFailAction => {
  return {
    type: FETCH_COUNTRY_STATS_FAIL,
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
        dispatch<FetchCountryStatsFailAction>(fetchCountryStatsFail('No data'));
      }
    } catch (err) {
      dispatch<FetchCountryStatsFailAction>(fetchCountryStatsFail(err));
    }
  };
};
