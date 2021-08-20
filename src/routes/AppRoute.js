import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { PrincipalScreen } from "../components/PrincipalScreen";
import { UserScreen } from "../components/user/UserScreen";
import { AuthRoute } from "./AuthRoute";
import { firebase } from "../firebase/firebase-config";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { ProductsScreen } from "../components/ProductsScreen";
import { ProductItemScreen } from "../components/products/ProductItemScreen";
import { ShoppingCartScreen } from "../components/ShoppingCartScreen";
export const AppRoute = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Wait...</h1>;
  }
  return (
    <>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              path="/auth"
              component={AuthRoute}
              isAuthenticated={isLoggedIn}
            />
            <PrivateRoute
              exact
              isAuthenticated={isLoggedIn}
              path="/user"
              component={UserScreen}
            />
            <Route path="/products" exact>
              <ProductsScreen />
            </Route>
            <Route path="/products/:id">
              <ProductItemScreen />
            </Route>
            <Route path="/shopping" exact>
              <ShoppingCartScreen />
            </Route>
            <Route path="/">
              <PrincipalScreen />
            </Route>

            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </>
  );
};
