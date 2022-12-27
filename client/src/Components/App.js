import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./Auth/signIn";
import GlobalStyles from "./GlobalStyles";
import Home from "./Homepage/home";
// import Bookmarks from "./NavPages/bookmarks";
import Messages from "./NavPages/messages";
import ProfilePage from "./Profile/profilePage";
import AddNewPost from "./NewPost/addNewPost";
import Service from "./Service/service";
import PublicProfile from "./Profile/publicProfile";

const App = () => {
  const isLogIn = localStorage.getItem("userId");
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          {!isLogIn ? <SignIn /> : <Redirect exact to="/services" />}
        </Route>
        <Route path="/home">
          {isLogIn ? <Home /> : <Redirect exact to="/" />}
        </Route>
        {/* <Route path="/bookmarks">
          {isLogIn ? <Bookmarks /> : <Redirect exact to="/" />}
        </Route> */}
        <Route path="/messages">
          {isLogIn ? <Messages /> : <Redirect exact to="/" />}
        </Route>
        <Route path="/profile">
          {isLogIn ? <ProfilePage /> : <Redirect exact to="/" />}
        </Route>
        <Route path="/newPost">
          {isLogIn ? <AddNewPost /> : <Redirect exact to="/" />}
        </Route>
        <Route path="/services">
          {isLogIn ? <Service /> : <Redirect exact to="/" />}
        </Route>
        <Route path="/user-profile">
          {isLogIn ? <PublicProfile /> : <Redirect exact to="/" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
