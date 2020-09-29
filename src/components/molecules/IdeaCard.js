import React, { useEffect } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Collapse, Grid,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { connect } from 'react-redux';
import { deleteIdea } from 'actions/ideaActions';
import { removeLike } from 'actions/ideaActions';
import { addLike } from 'actions/ideaActions';
import { routes } from 'routes';
import { withRouter } from 'react-router-dom';
import Conversation from 'components/molecules/Conversation';
import { getFirebase } from 'react-redux-firebase';

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
    paddingRight: '0',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    transformOrigin: '65%',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actionsContainer: {
    padding: '0 16px 12px',
  },
  commentsNumber: {
    cursor: 'pointer',
  },
  likeIcon: {
    color: theme.palette.secondary.main,
  },
  likeIconActive: {
    color: theme.palette.primary.main,
  },
}));

const IdeaCard = ({
  deleteIdeaFn, match, authorName = '', date, like = [], authorMail, id, content, handleClickOpen, addLikeFn, removeLikeFn, uid
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const CapitalizeName = authorName.slice(0, 1).toUpperCase() + authorName.slice(1);
  const nameInitial = authorName.slice(0, 1).toUpperCase();
  const likeCount = like.length;
  const isUserLike = like.includes(uid)

  const handleDelete = () => {
    deleteIdeaFn(id);
  };

  const handleLike = () => {
    if (like.includes(uid)) removeLikeFn(id);
    else addLikeFn(id);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const firestoreCurrentDoc = getFirebase().firestore().collection('ideas').doc(id)
      .collection('messages').orderBy('commentDate');
    const unsubsctibe = firestoreCurrentDoc.onSnapshot((snap) => {
      const data = snap.docs.map((el) => ({ id: el.id, ...el.data() }));
      setComments(data);
    });
    return () => unsubsctibe();
  }, []);

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
            <IconButton aria-label="add to favorites" onClick={handleLike} >
              <FavoriteIcon className={isUserLike ? classes.likeIconActive : classes.likeIcon} />
            </IconButton>
            {likeCount !== 0 ? <Typography>{likeCount}</Typography> : null}
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
      <CardActions
        className={classes.actionsContainer}
      >
        <Grid container direction="column" spacing={0}>
          <Grid item container direction="row" alignItems="center" justify="flex-end"  spacing={4}>
            <Grid item>
              <IconButton
                className={classes.expand}
                onClick={() => handleClickOpen(id, content)}
                aria-label="add comment"
                
              >
                <AddCommentIcon style={{marginLeft: 'auto'}}/>
              </IconButton>
            </Grid>
            <Grid item>
              {comments.length > 0
                && (
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
                )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {comments && (
              <Typography className={classes.commentsNumber} onClick={handleExpandClick} align="right" variant="subtitle2">{comments.length === 0 ? 'no comments' : `comments: ${comments.length}`}</Typography>
            )}
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit disableStrictModeCompat>
        <Conversation comments={comments} />
      </Collapse>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  uid: state.firebase.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
  deleteIdeaFn: (id) => dispatch(deleteIdea(id)),
  addLikeFn: (likedPostId) => dispatch(addLike(likedPostId)),
  removeLikeFn: (likedPostId) => dispatch(removeLike(likedPostId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IdeaCard));
