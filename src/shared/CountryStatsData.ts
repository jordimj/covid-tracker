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
