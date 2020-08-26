import { FETCH_COUNTRY_STATS } from './actions/types';
import { CountryStatsData } from '../shared/CountryStatsData';

export const reducer = (
  state = {},
  action: {
    type: string;
    payload: {
      timelineitems: { [key: string]: CountryStatsData | string }[];
    };
  }
) => {
  switch (action.type) {
    case FETCH_COUNTRY_STATS:
      if (action.payload.timelineitems[0].stat) {
        delete action.payload.timelineitems[0].stat;
      }
      return {
        ...state,
        countryStats: action.payload.timelineitems[0],
      };
    default:
      return state;
  }
};
