export type GroupByOptions = 'day' | 'week' | 'month';

export enum DataType {
  NewDailyCases = 'new_daily_cases',
  NewDailyDeaths = 'new_daily_deaths',
  TotalCases = 'total_cases',
  TotalRecoveries = 'total_recoveries',
  TotalDeaths = 'total_deaths',
}

export interface CountryStatsData {
  [DataType.NewDailyCases]: number;
  [DataType.NewDailyDeaths]: number;
  [DataType.TotalCases]: number;
  [DataType.TotalRecoveries]: number;
  [DataType.TotalDeaths]: number;
}

export interface showData {
  newDailyCases: boolean;
  newDailyDeaths: boolean;
  totalCases: boolean;
  totalRecoveries: boolean;
  totalDeaths: boolean;
}

export interface GlobalStatsData {
  total_cases: number;
  //   total_recovered: number;
  //   total_unresolved: number;
  total_deaths: number;
  total_new_cases_today: number;
  total_new_deaths_today: number;
  //   total_active_cases: number;
  //   total_serious_cases: number;
  //   total_affected_countries: number;
}

export interface RootState {
  countryStats?: {
    [key: string]: CountryStatsData;
  };
  globalStats?: GlobalStatsData;
  loading: boolean;
  error?: Error;
}
