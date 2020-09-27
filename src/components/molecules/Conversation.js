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
import ConversationItem from 'components/atoms/ConversationItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    overflow: 'hidden',
  },
}));


function Conversation({ comments }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {comments.map(({ id, comment, commentAuthorMail, commentAuthorName, commentDate, isCommentingAutor }) => (
        <ConversationItem key={id} comment={comment} commentAuthorMail={commentAuthorMail} commentAuthorName={commentAuthorName} commentDate={commentDate} isCommentingAutor={isCommentingAutor} />
      ))}

    </div>
  );
}

export default Conversation;
