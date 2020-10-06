import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { routes } from 'routes';

const useStyles = makeStyles((theme) => ({
  txt: {
    color: theme.palette.secondary.light,
    textAlign: 'center',
  },
  addButton: {
    color: theme.palette.primary.main,
  },
}));

const NoItemsInfo = ({ like }) => {
  const classes = useStyles();
  return (
    <Grid container wrap="nowrap" justify="center" alignItems="center" item xs={12}>
      <Typography className={classes.txt} variant="h5">{like ? 'nothing here, no favorites posts...' : 'nothing here, you can add your post here:'}</Typography>
      {!like && (
      <Link to={routes.newidea}>
        <IconButton>
          <AddCircleOutlineIcon className={classes.addButton} fontSize="large" />
        </IconButton>
      </Link>
      )}
    </Grid>
  );
};

NoItemsInfo.propTypes = {
  like: PropTypes.bool,
};

NoItemsInfo.defaultProps = {
  like: false,
};

export default NoItemsInfo;
