import * as actionTypes from './actions/types';
import {
  FetchCountryStatsAction,
  FetchGlobalStatsAction,
} from './actions/actions';
import { RootState } from '../types';

export const reducer = (
  state = { loading: false },
  action: FetchCountryStatsAction | FetchGlobalStatsAction
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

    case actionTypes.FETCH_GLOBAL_STATS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_GLOBAL_STATS_SUCCESS:
      return {
        ...state,
        globalStats: action.globalStats,
        loading: false,
      };
    case actionTypes.FETCH_GLOBAL_STATS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};
