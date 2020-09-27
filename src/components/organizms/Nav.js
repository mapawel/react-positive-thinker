import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
}));

const Nav = ({ children, signOutFn }) => {
  const classes = useStyles();
  const userName = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : 'user';
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            <Typography>
            log out</Typography></Link>
          <Avatar className={classes.avatar}>{userName.slice(0,1).toUpperCase()}</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
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
        {children}
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOutFn: () => dispatch(signOutAction())
})

export default connect(null, mapDispatchToProps)(Nav);