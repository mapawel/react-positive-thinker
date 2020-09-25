import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  firstLine: {
    fontWeight: '300',
    lineHeight: '.85',
    letterSpacing: '3px',
    whiteSpace: 'nowrap',
  },
  secondLine: {
    fontWeight: '500',
    fontSize: '25px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
});

const Logo = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={className} display="block" width="250px">
      <Typography className={classes.firstLine} variant="h6" color="secondary">
        think positive with
      </Typography>
      <Typography className={classes.secondLine} variant="h5" color="primary">
        positive thinker
      </Typography>
    </Box>
  );
};

export default Logo;
