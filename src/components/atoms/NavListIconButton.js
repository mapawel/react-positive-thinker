import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  ListItem, ListItemIcon, ListItemText, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listItem: {
    color: theme.palette.primary.main,
    height: '70px',
  },
  linkStyle: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    '&>*':{
      color: theme.palette.primary.main,
      }
  },
  active: {
    '&>*':{
    color: theme.palette.success.main,
    }
  },
}));

const NavListIconButton = ({ children, txt, to, exact }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem} button key={txt}>
      <NavLink exact={exact} activeClassName={classes.active} className={classes.linkStyle} to={to}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={txt} />
      </NavLink>
    </ListItem>
  );
};

export default NavListIconButton;
