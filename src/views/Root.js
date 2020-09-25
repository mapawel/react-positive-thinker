import React from 'react';
import GlobalStyle from 'themes/GlobalStyle';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'themes/mainTheme';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { routes } from 'routes';
import NewIdea from 'views/NewIdea';
import Wall from 'views/Wall';
import Favs from 'views/Favs';
import Detailidea from 'views/Detailidea';
import { ToastContainer } from 'react-toastify';
import 'config/toaststyles.css';
import { useSelector } from 'react-redux';
import SignedInUp from 'views/SignInUp';


const Root = () => {
  const UserIsLoggedIn = ({ children }) => (
    (useSelector((state) => state.firebase.auth.isEmpty)) ? <Redirect to="/" /> : children
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ToastContainer />
        {useSelector((state) => state.firebase.auth.isEmpty) ? <SignedInUp /> : null}
        <UserIsLoggedIn>
            <Switch>
              <Route exact path={routes.home} component={Wall} />
              <Route exact path={routes.ideas} component={Wall} />
              <Route path={routes.idea} component={Detailidea} />
              <Route exact path={routes.favs} component={Favs} />
              <Route path={routes.fav} component={Detailidea} />
              <Route path={routes.newidea} component={NewIdea} />
            </Switch>
        </UserIsLoggedIn>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
