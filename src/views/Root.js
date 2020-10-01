import React, { useState, useEffect } from 'react';
import GlobalStyle from 'themes/GlobalStyle';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'themes/mainTheme';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { routes } from 'routes';
import NewIdea from 'views/NewIdea';
import Wall from 'views/Wall';
import Detailidea from 'views/Detailidea';
import { ToastContainer } from 'react-toastify';
import 'config/toaststyles.css';
import { useSelector } from 'react-redux';
import SignedInUp from 'views/SignInUp';
import firebase from 'config/fbConfig';

const Root = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else setUser(null);
    });
    return unsubscribe;
  }, []);

  const UserIsLoggedIn = ({ children }) => (
    user ? children : <Redirect to="/" />
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ToastContainer />
        {user ? null : <SignedInUp />}
        <UserIsLoggedIn>
          <Switch>
            <Route exact path={routes.home} component={Wall} />
            <Route exact path={routes.ideas} component={Wall} />
            <Route path={routes.idea} component={Detailidea} />
            <Route exact path={routes.favs} component={Wall} />
            <Route path={routes.fav} component={Detailidea} />
            <Route path={routes.newidea} component={NewIdea} />
          </Switch>
        </UserIsLoggedIn>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
