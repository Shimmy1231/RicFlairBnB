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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profile-icon-button" onClick={openMenu}>
        <i class="fa-solid fa-city"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li key={user.username}>{user.firstName} {user.lastName}</li>
            <li key={user.email}>{user.email}</li>
            <NavLink to="/spots/current">
              <button>Spots</button>
            </NavLink>
            <li>
              <button className="personal-page-button" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : showLoginModal && showSignupModal && (
          <>
            <li>
              <OpenModalButton
                onModalClose={() => setShowLoginModal(false)}
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                onModalClose={() => setShowSignupModal(false)}
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
