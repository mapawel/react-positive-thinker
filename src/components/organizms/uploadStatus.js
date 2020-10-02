import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: '100%',
  },
  rootHidden: {
    display: 'none',
  },
});

const LinearDeterminate = ({ uploadStatus: { transferred, total } }) => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [isHidden, setIsHidden] = React.useState(true);

  React.useEffect(() => {
    if (transferred && total) {
      let diff = total - transferred;
      let calculatedProgress = ((total - diff) / total) * 100;
      setProgress(calculatedProgress);
    }

    if(progress === 100 || progress === 0) {
      setIsHidden(true)
    }
    else {
      setIsHidden(false)}
    // return () => {};
  }, [transferred, total, isHidden, progress]);

  return (
    <div className={isHidden? classes.rootHidden : classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  uploadStatus: state.idea.uploadStatus,
});

export default connect(mapStateToProps)(LinearDeterminate);

// uploadStatus: {
//   transferred: payload.transferred,
//   total: payload.total,
//   status: payload.status,
// }
