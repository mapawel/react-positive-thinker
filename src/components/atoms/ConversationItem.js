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
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  avatarAuthor: {
    backgroundColor: theme.palette.primary.main,
  },
  box: {
    padding: theme.spacing(2),
    cursor: 'pointer',
  },
}));

const ConversationItem = ({
  comment, commentAuthorMail, commentAuthorName, isCommentingAutor,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  return (
    <Box
      onClick={() => setExpanded(!expanded)}
      className={classes.box}
      style={expanded ? { maxWidth: '60vw' } : null}
    >
      <Grid container direction="column" wrap="nowrap" spacing={0}>
        <Grid item container direction="row" wrap="nowrap" spacing={2} alignItems="center">
          <Grid item>
            <Avatar className={isCommentingAutor ? classes.avatarAuthor : null}>{commentAuthorName.slice(0, 1).toUpperCase()}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="body2">{`${commentAuthorMail} ${isCommentingAutor && ' <- author'}`}</Typography>
          </Grid>
        </Grid>
        <Grid item zeroMinWidth style={{ marginLeft: '55px' }}>
          <Typography noWrap={expanded}>{comment}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConversationItem;
