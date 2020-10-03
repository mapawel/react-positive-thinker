import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '75px',
    zIndex: '200',
    width: '85%',
    height: '80px',
    padding: '38px 20px',
    backgroundColor: '#000000BB',
    borderRadius: '10px',
    boxShadow: theme.shadows[12],
    transition: 'transform .2s',
    transform: 'translateY(0)',
  },
  rootHidden: {
    transform: 'translateY(-150px)',
  },
}));

const LinearDeterminate = ({ uploadStatus: { transferred, total } }) => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [isHidden, setIsHidden] = React.useState(true);

  React.useEffect(() => {
    if (transferred && total) {
      const diff = total - transferred;
      const calculatedProgress = ((total - diff) / total) * 100;
      setProgress(calculatedProgress);
    }

    if (progress === 100 || progress === 0) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [transferred, total, isHidden, progress]);

  return (
    <div className={clsx(classes.root, {[classes.rootHidden]: isHidden})}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

const mapStateToProps = ({ idea: { uploadStatus } }) => ({
  uploadStatus,
});

export default connect(mapStateToProps)(LinearDeterminate);
