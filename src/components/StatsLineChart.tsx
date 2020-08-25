import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { CountryStatsData, DataType } from '../shared/CountryStatsData';

const getData = (data: CountryStatsData[], dataType: DataType): number[] => {
  return data.map((element) => {
    return element[dataType];
  });
};

export default function StatsLineChart({ countryStats }: { countryStats: {} }) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const data: CountryStatsData[] = Object.values(countryStats);
  const labels: string[] = Object.keys(countryStats);

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
            position: 'right',
          },
        },
      });
    }

    return () => lineChart.destroy();
  }, [countryStats]);

  return <canvas ref={chartRef} width="900" height="600" />;
}
