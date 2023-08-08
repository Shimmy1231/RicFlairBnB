import * as sessionActions from "../../store/session";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errors = {};
    if (!email) errors.email = 'Must include Email';
    if (!username) errors.username = 'Must include Username';
    if (!firstName) errors.firstName = 'Must include First Name';
    if (!lastName) errors.lastName = 'Must include Last Name';
    if (!password) errors.password = 'Must include Password';
    if (!confirmPassword) errors.confirmPassword = 'Must include Confirm Password';
    if (password !== confirmPassword) errors.matchPassword = "Confirm Password field must be the same as the Password field";

    setErrors(errors)

  }, [ email, username, firstName, lastName, password, confirmPassword ])

  if (user) return <Redirect to="/" />

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
        ).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
             setErrors(data.errors);
            }
          }
        )
  };

  return (
    <>
    <div>
      <div className="just-the-background">
      <h1 className="login-text-fancy">Sign Up</h1>
      <form className="signing-up-form" onSubmit={handleSubmit}>
        <label className="signing-up-box-top">
          Email
          <input
            className="input-labels"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="signing-up-box-top">
          Username
          <input
            className="input-labels"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label className="signing-up-box-top">
          First Name
          <input
            className="input-labels"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="signing-up-box-top">
          Last Name
          <input
            className="input-labels"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="signing-up-box-top">
          Password
          <input
            className="input-labels"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label className="signing-up-box-top">
          Confirm Password
          <input
            className="input-labels"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className="button-for-signingup" type="submit">Sign Up</button>
      </form>
      </div>
    </div>
    </>
  );
}

export default SignupFormModal;
