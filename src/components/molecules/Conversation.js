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

const conv = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minus, itaque illum illo, ut explicabo voluptatem id cum eum dicta vitae error minima mollitia, debitis quo praesentium maxime harum velit?Nihil quisquam libero consequatur nemo nesciunt illo reiciendis, eum, tempore vel laborum aliquid, accusamus unde at rem vero aliquam cumque hic ipsa? Numquam eos necessitatibus, a facere cupiditate rerum minus.',
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor sunt laudantium eos quod officia, ut quidem numquam voluptatum officiis obcaecati?',
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam laborum consequuntur rerum eligendi, dolorem maxime.',
];

function Conversation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {conv.map((con, index) => (
        <ConversationItem key={index} con={con} />
      ))}

    </div>
  );
}

export default Conversation;
