import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import LoginFormModal from "./components/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal";
import Navigation from "./components/Navigation";

import GetAllSpots from "./components/Spots/GetAllSpots";
import PersonalSpots from "./components/Spots/PersonalSpots";
import AddSpot from "./components/Spots/AddSpot";
import GetSpotDetails from "./components/Spots/GetSpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <GetAllSpots />
          </Route>
          <Route path="/spots/current" exact>
            <PersonalSpots />
          </Route>
          <Route path="/spots/new" exact>
            <AddSpot />
          </Route>
          <Route path="/spots/:spotId" exact>
            <GetSpotDetails />
          </Route>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
