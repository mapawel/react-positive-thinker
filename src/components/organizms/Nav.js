import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Drawer, AppBar, Toolbar, List, IconButton, Typography, Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import BallotIcon from '@material-ui/icons/Ballot';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FaceIcon from '@material-ui/icons/Face';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Logo from 'components/atoms/Logo';
import NavListIconButton from 'components/atoms/NavListIconButton';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOutAction } from 'actions/authActions';
import firebase from 'config/fbConfig';
import LinearDeterminate from 'components/organizms/uploadStatus';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '20px 0',
  },
  appBar: {
    backgroundColor: theme.palette.success.main,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    border: 'none',
    boxShadow: '3px 0 12px -8px lightgrey',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    position: 'relative',
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginLeft: '25px',
  },
  logo: {
    marginRight: 'auto',
  },
  logOut: {
    whiteSpace: 'nowrap',
  },
  logOutSmall: {
    whiteSpace: 'nowrap',
    fontSize: '12px',
  },
}));

const Nav = ({ children, signOutFn }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName(null);
    });
    return unsubscribe;
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const smallScreen = useMediaQuery('(max-width:440px)');

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon color="secondary" />
          </IconButton>
          <Logo className={classes.logo} />
          <Link className={classes.link} onClick={signOutFn} to={routes.home}>
            <Typography className={smallScreen ? classes.logOutSmall : classes.logOut}>
              log out
            </Typography>
          </Link>
          <Avatar className={classes.avatar}>{userName && userName.slice(0, 1).toUpperCase()}</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
      onMouseEnter={!smallScreen ? handleDrawerOpen : ()=>{}}
      onMouseLeave={!smallScreen ? handleDrawerClose: ()=>{}}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <NavListIconButton
            txt="wall"
            to={routes.home}
            exact
          >
            <BallotIcon fontSize="large" />
          </NavListIconButton>
          <NavListIconButton
            txt="my Inspirations"
            to={routes.ideas}
          >
            <FaceIcon fontSize="large" />
          </NavListIconButton>
          <NavListIconButton
            txt="favorites"
            to={routes.favs}
          >
            <FavoriteIcon fontSize="large" />
          </NavListIconButton>
          <NavListIconButton
            txt="new Inspiration"
            to={routes.newidea}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </NavListIconButton>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <LinearDeterminate />
        {children}
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOutFn: () => dispatch(signOutAction()),
});

export default connect(null, mapDispatchToProps)(Nav);
