import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';

const useStyles = makeStyles({
  firstLine: {
    fontWeight: '300',
    lineHeight: '.85',
    letterSpacing: '3px',
    whiteSpace: 'nowrap',
  },
  firstLineSmall: {
    letterSpacing: '2px',
    fontSize: '14px',
  },
  secondLine: {
    fontWeight: '500',
    fontSize: '25px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  secondLineSmall: {
    fontSize: '17px',
  },
});

const Logo = ({ className }) => {
  const classes = useStyles();
  const smallScreen = useMediaQuery('(max-width:440px)');
  return (
    <Box className={className} display="block">
      <Typography className={clsx(classes.firstLine, { [classes.firstLineSmall]: smallScreen })} variant="h6" color="secondary">
        think positive with
      </Typography>
      <Typography className={clsx(classes.secondLine, { [classes.secondLineSmall]: smallScreen })} variant="h5" color="primary">
        positive thinker
      </Typography>
    </Box>
  );
};

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Logo;
