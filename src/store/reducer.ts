import * as actionTypes from './actions/types';
import { FetchCountryStatsAction } from './actions/actions';
import { CountryStatsData } from '../shared/CountryStatsData';

export interface RootState {
  countryStats?: {
    [key: string]: CountryStatsData;
  };
  loading: boolean;
  error?: Error | string;
}

export const reducer = (
  state = { loading: false },
  action: FetchCountryStatsAction
): RootState => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRY_STATS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_COUNTRY_STATS_SUCCESS:
      if (action.payload.timelineitems[0].stat) {
        delete action.payload.timelineitems[0].stat;
      }
      return {
        ...state,
        countryStats: action.payload.timelineitems[0],
        loading: false,
        error: undefined,
      };

    case actionTypes.FETCH_COUNTRY_STATS_FAIL:
      return {
        ...state,
        countryStats: undefined,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};
