import React, { useState } from 'react';
import {
  Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Grid, Box,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '95%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  listItemText: {
    display: 'flex',
    alignItems: 'center',
  },
  box: {
    padding: theme.spacing(2),
    cursor: 'pointer',
  },
}));

const ConversationItem = ({ con }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  return (
    <Box
      onClick={() => setExpanded(!expanded)}
      className={classes.box}
      style={expanded ? {maxWidth: '60vw'} : null}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item zeroMinWidth>
          <Typography noWrap={expanded}>{con}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConversationItem;
