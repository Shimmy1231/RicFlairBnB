import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const [showOptions, setShowOptions] = useState(false);
  const [spotId, setSpotId] = useState("");
  const [inputs, setInputs] = useState("");
  const [filteredData, setFilteredData] = useState([])
  const sessionUser = useSelector((state) => state.session.user);
  const spotsData = useSelector((state) => state.spots.allSpots);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
        <ProfileButton user={null} />
      </li>
    );
    }

    useEffect(() => {
        if (!showOptions) return;

        const closeOptions = () => {
            setShowOptions(false);
        };
        document.addEventListener("click", closeOptions)

        return () => document.removeEventListener("click", closeOptions)
    }, [showOptions]);


  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
