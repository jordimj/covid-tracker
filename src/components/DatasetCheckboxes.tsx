import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, FormGroup, Typography } from '@material-ui/core';
import { showData } from '../shared/CountryStatsData';

interface CheckboxProps {
  isMobile: boolean;
}

const useStyles = makeStyles({
  root: {
    padding: '0 0 10px 0',
    flexWrap: 'unset',
  },
  element: {
    display: (props: CheckboxProps) => (props.isMobile ? 'grid' : 'flex'),
  },
  checkbox: {
    fontSize: (props: CheckboxProps) => (props.isMobile ? '12px' : 'unset'),
  },
});

export const DatasetCheckboxes = ({
  show,
  setShow,
  isMobile,
}: {
  show: showData;
  setShow: Dispatch<SetStateAction<showData>>;
  isMobile: boolean;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShow({ ...show, [event.target.name]: event.target.checked });
  };

  const classes = useStyles({ isMobile });

  return (
    <FormGroup row classes={{ root: classes.root }}>
      <FormControlLabel
        classes={{ root: classes.element }}
        control={
          <Checkbox
            classes={{ root: classes.checkbox }}
            checked={show.newDailyCases}
            onChange={handleChange}
            name="newDailyCases"
          />
        }
        label={
          <Typography classes={{ root: classes.checkbox }}>
            New Daily Cases
          </Typography>
        }
      />
      <FormControlLabel
        classes={{ root: classes.element }}
        control={
          <Checkbox
            checked={show.newDailyDeaths}
            onChange={handleChange}
            name="newDailyDeaths"
          />
        }
        label={
          <Typography classes={{ root: classes.checkbox }}>
            New Daily Deaths
          </Typography>
        }
      />
      <FormControlLabel
        classes={{ root: classes.element }}
        control={
          <Checkbox
            checked={show.totalCases}
            onChange={handleChange}
            name="totalCases"
          />
        }
        label={
          <Typography classes={{ root: classes.checkbox }}>
            Total Cases
          </Typography>
        }
      />
      <FormControlLabel
        classes={{ root: classes.element }}
        control={
          <Checkbox
            checked={show.totalRecoveries}
            onChange={handleChange}
            name="totalRecoveries"
          />
        }
        label={
          <Typography classes={{ root: classes.checkbox }}>
            Total Recoveries
          </Typography>
        }
      />
      <FormControlLabel
        classes={{ root: classes.element }}
        control={
          <Checkbox
            checked={show.totalDeaths}
            onChange={handleChange}
            name="totalDeaths"
          />
        }
        label={
          <Typography classes={{ root: classes.checkbox }}>
            Total Deaths
          </Typography>
        }
      />
    </FormGroup>
  );
};
