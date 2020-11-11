import React from 'react';
import { GlobalStatsData } from '../../types';

export const DataShowerBox = ({
  kind,
  quantity,
}: {
  kind: keyof GlobalStatsData;
  quantity: number;
}) => {
  const titles = {
    total_cases: 'Total reported cases',
    total_deaths: 'Total reported deaths',
    total_new_cases_today: 'New cases today',
    total_new_deaths_today: 'New deaths today',
  };

  return (
    <div>
      <h2>{titles[kind]}</h2>
      <h2>{quantity.toLocaleString()}</h2>
    </div>
  );
};
