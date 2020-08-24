import { FETCH_COUNTRY_STATS } from './actions/types';

export const reducer = (
  state = { countryStats: {} },
  action: { type: string; payload: { timelineitems: {}[] } }
) => {
  switch (action.type) {
    case FETCH_COUNTRY_STATS:
      return {
        ...state,
        countryStats: action.payload.timelineitems[0],
      };
    default:
      return state;
  }
};
