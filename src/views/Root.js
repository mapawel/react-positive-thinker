import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { routes } from 'routes';
import firebase from 'config/fbConfig';
import NewIdea from 'views/NewIdea';
import Wall from 'views/Wall';
import SignedInUp from 'views/SignInUp';
import UserIsLoggedIn from 'views/UserIsLoggedIn';
import RootThemeTemplate from 'templates/RootThemeTemplate';

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

  return (
    <RootThemeTemplate>
      <BrowserRouter>
        {user ? null : <SignedInUp />}
        <UserIsLoggedIn user={user}>
          <Switch>
            <Route exact path={routes.home} component={Wall} />
            <Route path={routes.ideas} component={Wall} />
            <Route path={routes.favs} component={Wall} />
            <Route path={routes.newidea} component={NewIdea} />
          </Switch>
        </UserIsLoggedIn>
      </BrowserRouter>
    </RootThemeTemplate>
  );
};

export default Root;
