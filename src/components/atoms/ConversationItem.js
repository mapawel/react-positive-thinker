/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Avatar, Typography, Grid, Box,
} from '@material-ui/core';
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
  commentHeaderTxt: {
    color: theme.palette.primary.dark,
  },
}));

const ConversationItem = ({
  comment, commentAuthorMail, commentAuthorName, isCommentingAutor, commentDate,
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
          <Grid className={classes.commentHeaderTxt} item container direction="column" spacing={0} alignItems="flex-start">
            <Grid item>
              <Typography variant="caption">{commentAuthorMail}</Typography>
              {isCommentingAutor && <Typography variant="caption"> --author</Typography>}

            </Grid>
            <Grid item>
              <Typography variant="caption">{moment(commentDate.toDate()).calendar()}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item zeroMinWidth style={{ marginLeft: '55px' }}>
          <Typography noWrap={expanded}>{comment}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

ConversationItem.propTypes = {
  comment: PropTypes.string.isRequired,
  commentAuthorMail: PropTypes.string.isRequired,
  commentAuthorName: PropTypes.string.isRequired,
  isCommentingAutor: PropTypes.bool.isRequired,
  commentDate: PropTypes.object.isRequired,
};

export default ConversationItem;
