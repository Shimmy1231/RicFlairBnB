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
import UpdatingSpot from "./components/Spots/UpdatingSpot";
import AddReview from "./components/AddReview";
import ConfirmDeleteModal from"./components/ConfirmDeleteModal"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [deletingModal, setDeletingModal] = useState(false);

  const handleDeletion = () => {
    setDeletingModal(false);
  }

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
        <Switch>
          <Route path="/spots/current" exact>
            <PersonalSpots />
          </Route>
          <Route path="/spots/:spotId/review">
            <AddReview />
          </Route>
          <Route path="/spots/:spotId/edit">
            <UpdatingSpot />
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
          <Route path="/" exact>
            <GetAllSpots />
          </Route>
        </Switch>
        {deletingModal && (
          <ConfirmDeleteModal onDelete={handleDeletion} onCancel={() => setDeletingModal(false)} />
        )}
        </>
      )}
    </>
  );
}

export default App;
