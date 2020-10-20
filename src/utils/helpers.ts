import { GroupByOptions } from '../components/GroupByRadio';
import { CountryStatsData, DataType } from '../shared/CountryStatsData';
import { useWindowSize } from './useWindowSize';

export function GetIsMobile(): boolean {
  const { width, height } = useWindowSize();

  if (height === undefined || width === undefined) {
    return true;
  }

  return height <= 700 || width <= 500;
}

function getWeekNumber(date: Date) {
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
  return [date.getUTCFullYear(), weekNo];
}

function getDateOfISOWeek(week: number, year: number) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

function getTimelineDate(date: Date, by: GroupByOptions) {
  switch (by) {
    case 'day':
      return date.toLocaleDateString('en-US');
    case 'week':
      const weekNumber = getWeekNumber(date);
      return getDateOfISOWeek(weekNumber[1], weekNumber[0]).toLocaleDateString(
        'en-US'
      );
    case 'month':
      return `${date.getMonth() + 1}/1/${date.getFullYear()}`;
  }
}

export function groupDataBy(data: {}, by: GroupByOptions) {
  const dataArray: Array<[string, any]> = Object.entries(data).map(([k, v]) => [
    k,
    v,
  ]);

  return dataArray.reduce(function (
    acc: { [key: string]: CountryStatsData },
    item
  ) {
    const [date, dataFromTheDay] = item;
    const timelineDate = getTimelineDate(new Date(date), by);

    if (!acc[timelineDate]) {
      acc[timelineDate] = { ...dataFromTheDay };
    } else {
      acc[timelineDate][DataType.NewDailyCases] +=
        dataFromTheDay[DataType.NewDailyCases];
      acc[timelineDate][DataType.NewDailyDeaths] +=
        dataFromTheDay[DataType.NewDailyDeaths];
    }

    return acc;
  },
  {});
}
