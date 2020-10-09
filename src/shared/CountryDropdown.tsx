import React from 'react';
import { InputLabel, FormControl, MenuItem, Select } from '@material-ui/core';
import { CountryList } from './CountryList';
import CSS from 'csstype';

export const CountryDropdown = ({
  countryName,
  handleChange,
  isMobile,
}: {
  countryName: string;
  handleChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
  isMobile: boolean;
}): JSX.Element => {
  const getMenuItems = (): JSX.Element[] => {
    let items: JSX.Element[] = [];
    for (const [code, country] of Object.entries(CountryList)) {
      items.push(
        <MenuItem key={code} value={code}>
          {country}
        </MenuItem>
      );
    }
    return items;
  };

  const dropdownStyle: CSS.Properties = {
    width: isMobile ? '90%' : '400px',
  };

  return (
    <FormControl variant="outlined" style={dropdownStyle}>
      <InputLabel id="select-outlined-label">Country</InputLabel>
      <Select
        labelId="select-outlined-label"
        id="select-outlined"
        value={countryName}
        onChange={handleChange}
        label="Country name"
      >
        {getMenuItems()}
      </Select>
    </FormControl>
  );
};
