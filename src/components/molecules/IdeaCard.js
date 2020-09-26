import React from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Collapse
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { connect } from 'react-redux';
import { deleteIdea } from 'actions/ideaActions';
import { routes } from 'routes';
import { withRouter } from 'react-router-dom';
import Conversation from 'components/molecules/Conversation';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[4],
    // maxWidth: '90vw',
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark,
  },
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
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  commentIcon: {
    marginLeft: 'auto',
  },
}));

const IdeaCard = ({
  deleteIdeaFn, match, authorName = '', date, authorMail, id, content, handleClickOpen
}) => {
  const CapitalizeName = authorName.slice(0, 1).toUpperCase() + authorName.slice(1);
  const nameInitial = authorName.slice(0, 1).toUpperCase();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleDelete = () => {
    deleteIdeaFn(id);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            {nameInitial}
          </Avatar>
        )}
        title={`${CapitalizeName} (${authorMail})`}
        subheader={moment(date.toDate()).calendar()}
        action={(
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color="secondary" />
            </IconButton>
            {match.path === routes.ideas && (
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteForeverIcon color="secondary" />
              </IconButton>
            )}
          </CardActions>
        )}
      />

      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={classes.commentIcon}
          onClick={() => handleClickOpen(id, content)}
          aria-label="add comment"
        >
          <AddCommentIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit disableStrictModeCompat>
      <Conversation />
      </Collapse>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteIdeaFn: (id) => dispatch(deleteIdea(id)),
});

export default connect(null, mapDispatchToProps)(withRouter(IdeaCard));
