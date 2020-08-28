import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { CountryStatsData, DataType } from '../shared/CountryStatsData';
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

export default function StatsLineChart({
  countryStats,
  timespan,
  isMobile,
  windowSize,
}: {
  countryStats: {};
  timespan: string;
  isMobile: boolean;
  windowSize: WindowProps;
}) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = windowSize;

  let slicedData = countryStats;

  if (timespan !== 'all') {
    slicedData = dataTimespanSlicer(timespan, countryStats);
    console.log(slicedData);
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
            },
            {
              data: newDailyDeaths,
              label: 'New Daily deaths',
              backgroundColor: 'rgba(128,0,0, 0.5)',
              borderWidth: 1,
            },
            {
              data: totalCases,
              label: 'Total cases',
              backgroundColor: 'rgba(255,255,0, 0.5)',
              borderWidth: 1,
            },
            {
              data: totalRecoveries,
              label: 'Total recoveries',
              backgroundColor: 'rgba(0,255,0, 0.5)',
              borderWidth: 1,
            },
            {
              data: totalDeaths,
              label: 'Total deaths',
              backgroundColor: 'rgba(255,0,0, 0.5)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
          legend: {
            position: isMobile ? 'bottom' : 'right',
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
      width={isMobile && width ? width * 0.95 : '900'}
      height={isMobile && height ? height * 0.8 : '600'}
    />
  );
}
