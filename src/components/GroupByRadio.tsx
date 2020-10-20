import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

export type GroupByOptions = 'day' | 'week' | 'month';

interface RadioProps {
  isMobile: boolean;
}

const useStyles = makeStyles({
  root: {
    // padding: (props: RadioProps) => (props.isMobile ? '0px' : '10px 0'),
  },
});

export const GroupByRadio = ({
  groupBy,
  setGroupBy,
  isMobile,
}: {
  groupBy: string;
  setGroupBy: Dispatch<SetStateAction<GroupByOptions>>;
  isMobile: boolean;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupBy((event.target as HTMLInputElement).value as GroupByOptions);
  };

  const classes = useStyles({ isMobile });

  return (
    <FormControl component="fieldset" classes={{ root: classes.root }}>
      <RadioGroup
        name="groupBy"
        value={groupBy}
        defaultValue="week"
        onChange={handleChange}
        row={true}
      >
        <FormControlLabel value="day" control={<Radio />} label="Day" />
        <FormControlLabel value="week" control={<Radio />} label="Week" />
        <FormControlLabel value="month" control={<Radio />} label="Month" />
      </RadioGroup>
    </FormControl>
  );
};
