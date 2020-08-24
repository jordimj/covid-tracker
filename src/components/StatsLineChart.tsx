import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

export default function StatsLineChart({ countryStats }: { countryStats: {} }) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const data: {}[] = Object.values(countryStats);
  const labels: string[] = Object.keys(countryStats);

  useEffect((): void => {
    const myChartRef = chartRef.current;

    if (null !== myChartRef) {
      const lineChart = new Chart(myChartRef, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              data,
              hoverBorderColor: 'rgba(128, 128, 128, 1)',
              borderColor: 'rgba(255, 99, 132, 0.8)',
              borderWidth: 1,
              backgroundColor: [
                'rgba(255,0,0, 0.5)',
                'rgba(255,255,0, 0.5)',
                'rgba(0,255,0, 0.5)',
                'rgba(128,0,0, 0.5)',
              ],
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

    // return () => lineChart.destroy();
  }, [countryStats]);

  return <canvas ref={chartRef} width="900" height="600" />;
}
