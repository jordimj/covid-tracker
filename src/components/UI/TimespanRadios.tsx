import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

interface RadioProps {
  isMobile: boolean;
}

const useStyles = makeStyles({
  root: {
    padding: (props: RadioProps) => (props.isMobile ? '0px' : '10px 0'),
  },
});

export const TimespanRadios = ({
  timespan,
  setTimespan,
  isMobile,
}: {
  timespan: string;
  setTimespan: Dispatch<SetStateAction<string>>;
  isMobile: boolean;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimespan((event.target as HTMLInputElement).value);
  };

  const classes = useStyles({ isMobile });

  return (
    <FormControl component="fieldset" classes={{ root: classes.root }}>
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
