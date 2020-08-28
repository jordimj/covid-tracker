import React, { Dispatch, SetStateAction } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormLabel } from '@material-ui/core';

export const TimespanRadios = ({
  timespan,
  setTimespan,
}: {
  timespan: string;
  setTimespan: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimespan((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Timespan</FormLabel>
      <RadioGroup
        name="timespan"
        value={timespan}
        onChange={handleChange}
        row={true}
      >
        <FormControlLabel
          value="weeks"
          control={<Radio />}
          label="Last 2 weeks"
        />
        <FormControlLabel
          value="month"
          control={<Radio />}
          label="Last month"
        />
        <FormControlLabel value="all" control={<Radio />} label="All" />
      </RadioGroup>
    </FormControl>
  );
};
