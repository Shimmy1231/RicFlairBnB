import * as sessionActions from "../../store/session";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          username,
          email,
          password
        })
      )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    if (!email.includes("@")) {
      return setErrors({
        email: "Must be a valid email"
      })
    }
    if (username.length < 4) {
      return setErrors({
        username: "Must be over 4 characters long"
      })
    }
    if (firstName.length < 2) {
      return setErrors({
        firstName: "Must be over 1 character long"
      })
    }
    if (lastName.length < 2) {
      return setErrors({
        lastName: "Must be over 1 character long"
      })
    }
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password must be the same as the Password"
      })
    }
    return setErrors();
  }

  return (
    <div>
      <div id="signup">Sign Up</div>
      <form className="signing-up-form" onSubmit={handleSubmit}>
        <div>
          <label className="signing-up-box-top">
            Email
            <input
              className="input-labels"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
        </div>
        {errors.email && <p>{errors.email}</p>}
        <div>
          <label className="signing-up-box-top">
            Username
            <input
              className="input-labels"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </label>
        </div>
        {errors.username && <p>{errors.username}</p>}
        <div>
          <label className="signing-up-box-top">
            First Name
            <input
              className="input-labels"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </label>
        </div>
        {errors.firstName && <p>{errors.firstName}</p>}
        <div>
          <label className="signing-up-box-top">
            Last Name
            <input
              className="input-labels"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </label>
        </div>
        {errors.lastName && <p>{errors.lastName}</p>}
        <div>
          <label className="signing-up-box-top">
            Password
            <input
              className="input-labels"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
        </div>
        {errors.password && <p>{errors.password}</p>}
        <div>
          <label className="signing-up-box-top">
            Confirm Password
            <input
              className="input-labels"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </label>
        </div>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className="button-for-signingup" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
