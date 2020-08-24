import axios from 'axios';
import { Dispatch } from 'redux';
import { FETCH_COUNTRY_STATS } from './types';

interface CountryStats {
  type: string;
  payload: {};
}

export const fetchCountryStats = (countryName: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(
      `https://api.thevirustracker.com/free-api?countryTimeline=${countryName}`
    );
    dispatch<CountryStats>({
      type: FETCH_COUNTRY_STATS,
      payload: response.data,
    });
  };
};
