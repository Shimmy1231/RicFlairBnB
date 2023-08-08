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

  return (
    <>
    <div className="just-the-background">

      <h1 className="login-text-fancy">Log In</h1>
      <form onSubmit={handleSubmit} className="login-modal-form">
        <label>
          Username or Email
          <input className="login-username-or-email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input className="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-modal-fail">
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        </div>
        <button type="submit" className="login-button">Log In</button>
        <button className="login-button-for-demo" onClick={demoUserLogin}>Demo User</button>
      </form>
    </div>
    </>
  );
}

export default LoginFormModal;
