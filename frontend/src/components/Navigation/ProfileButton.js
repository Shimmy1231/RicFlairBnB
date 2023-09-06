import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push(`/`)
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button id="profile-icon-button" onClick={openMenu}>
        <i class="fa-solid fa-city"></i>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user && showMenu ? (
          <div>
            <div>Hello, {user.username}</div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
            <NavLink to="/spots/current">
              <button id="personal-page-button">Manage Spots</button>
            </NavLink>
            <div>
              <button onClick={logout} id="logout-button">Log Out</button>
            </div>
          </div>
        ) : showMenu && (
          <div id="profile-dropdown-no-user">
            <button id="modal-button-login">
              <OpenModalButton
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </button>
            <button id="modal-button-login">
              <OpenModalButton
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
