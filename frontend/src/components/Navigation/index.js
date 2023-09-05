import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const [showOptions, setShowOptions] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!showOptions) return;

        const closeOptions = (e) => {
            setShowOptions(false);
        };
        document.addEventListener("click", closeOptions)

        return () => document.removeEventListener("click", closeOptions)
    }, [showOptions]);

  return (
    <div id="header">
      <div>
        <NavLink exact to="/" id="home-text-fancy">
        <i class="fa-solid fa-house"></i>
          RicFlairBnB
        </NavLink>
      </div>
      {isLoaded && (
        <div>
          {sessionUser && (
            <NavLink exact to="/spots/new" id="create-new-spot">
              Create a New Spot
            </NavLink>)}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
