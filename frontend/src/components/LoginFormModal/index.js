import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [credentialLength, setCredentialLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUserLogin = () => {
    setCredential("demo@user.io")
    setPassword("password")
  };

  const handleCredChange = (e) => {
    setCredential(e.target.value);
    setCredentialLength(e.target.value.length);
  };

  const handlePwChange = (e) => {
    setPassword(e.target.value);
    setPasswordLength(e.target.value.length)
  };

  return (
    <>
    <div id="just-the-background">

      <label id="login-text-fancy">Welcome to RicFlairBnB</label>
      <form onSubmit={handleSubmit} className="login-modal-form">
        <label>
          Username or Email
          <input id="login-username-or-email"
            type="text"
            value={credential}
            onChange={handleCredChange}
            required
          />
        </label>
        <label>
          Password
          <input id="login-password"
            type="password"
            value={password}
            onChange={handlePwChange}
            required
          />
        </label>
        <div id="login-modal-fail">
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        </div>
        <button type="submit" id="login-button" disabled={credentialLength < 4 || passwordLength < 6}>Log In</button>
        <button id="login-button-for-demo" onClick={demoUserLogin}>Demo User</button>
      </form>
    </div>
    </>
  );
}

export default LoginFormModal;
