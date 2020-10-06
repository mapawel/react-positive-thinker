import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ConversationItem from 'components/atoms/ConversationItem';

const useStyles = makeStyles({
  root: {
    flexGrow: 0,
    overflow: 'hidden',
  },
});

function Conversation({ comments }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {comments.map(({
        id, comment, commentAuthorMail, commentAuthorName, commentDate, isCommentingAutor,
      }) => (
        <ConversationItem key={id} comment={comment} commentAuthorMail={commentAuthorMail} commentAuthorName={commentAuthorName} commentDate={commentDate} isCommentingAutor={isCommentingAutor} />
      ))}

    </div>
  );
}

Conversation.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

Conversation.defaultProps = {
  comments: [],
};

export default Conversation;
