import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import {
  CountryStatsData,
  DataType,
  showData,
} from '../shared/CountryStatsData';
import { WindowProps } from '../utils/useWindowSize';

const getData = (data: CountryStatsData[], dataType: DataType): number[] => {
  return data.map((element) => {
    return element[dataType];
  });
};

const dataTimespanSlicer = (timespan: string, countryStats: {}): Object => {
  return Object.fromEntries(
    Object.entries(countryStats).slice(timespan === 'weeks' ? -15 : -30)
  );
};

export function StatsLineChart({
  countryStats,
  timespan,
  show,
  isMobile,
  windowSize,
}: {
  countryStats: {};
  timespan: string;
  show: showData;
  isMobile: boolean;
  windowSize: WindowProps;
}) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = windowSize;

  let slicedData = countryStats;

  if (timespan !== 'all') {
    slicedData = dataTimespanSlicer(timespan, countryStats);
  }

  const data: CountryStatsData[] = Object.values(slicedData);
  const labels: string[] = Object.keys(slicedData);

  const newDailyCases: number[] = getData(data, DataType.NewDailyCases);
  const newDailyDeaths: number[] = getData(data, DataType.NewDailyDeaths);
  const totalCases: number[] = getData(data, DataType.TotalCases);
  const totalRecoveries: number[] = getData(data, DataType.TotalRecoveries);
  const totalDeaths: number[] = getData(data, DataType.TotalDeaths);

  useEffect((): any => {
    const myChartRef = chartRef.current;
    let lineChart: Chart;

    Chart.scaleService.updateScaleDefaults('linear', {
      ticks: {
        min: 0,
      },
    });

    if (null !== myChartRef) {
      lineChart = new Chart(myChartRef, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              data: newDailyCases,
              label: 'New daily cases',
              backgroundColor: 'rgba(255,0,255, 0.5)',
              borderWidth: 1,
              hidden: !show.newDailyCases,
            },
            {
              data: newDailyDeaths,
              label: 'New Daily deaths',
              backgroundColor: 'rgba(128,0,0, 0.5)',
              borderWidth: 1,
              hidden: !show.newDailyDeaths,
            },
            {
              data: totalCases,
              label: 'Total cases',
              backgroundColor: 'rgba(255,255,0, 0.5)',
              borderWidth: 1,
              hidden: !show.totalCases,
            },
            {
              data: totalRecoveries,
              label: 'Total recoveries',
              backgroundColor: 'rgba(0,255,0, 0.5)',
              borderWidth: 1,
              hidden: !show.totalRecoveries,
            },
            {
              data: totalDeaths,
              label: 'Total deaths',
              backgroundColor: 'rgba(255,0,0, 0.5)',
              borderWidth: 1,
              hidden: !show.totalDeaths,
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit:
                    timespan === 'weeks'
                      ? 'day'
                      : timespan === 'month'
                      ? 'week'
                      : 'month',
                },
              },
            ],
          },
        },
      });
    }

    return () => lineChart.destroy();
  }, [slicedData]);

  return (
    <canvas
      ref={chartRef}
      width={isMobile && width ? width * 0.95 : '1200'}
      height={isMobile && height ? height * 0.65 : '600'}
    />
  );
}
