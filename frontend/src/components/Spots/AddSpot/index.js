import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addingSpot } from "../../../store/spots";
import { useHistory } from "react-router-dom";
import "./AddSpot.css";

function AddSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if (!name) errors.name = 'Must include Name';
        if (!address) errors.address = 'Must include Address';
        if (!city) errors.city = 'Must include City';
        if (!state) errors.state = 'Must include State';
        if (!country) errors.country = 'Must include Country';
        if (!description) errors.description = 'Must include Description';
        if (!price) errors.price = 'Must include Price';
        if (!url) errors.url = 'Must include Url';

        setErrors(errors)

    }, [name, address, city, state, country, description, price, url, lat, lng])

    if (!user) history.push("/");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!errors.length) {
          const potentialSpot = { name, address, city, state, country, description, price, url, lat, lng };
          const newSpot = await dispatch(addingSpot(potentialSpot));
          newSpot.SpotImages = [{ url: url }]
          if (newSpot) {
            history.push(`/spots/${newSpot.id}`)
          }
        }

        setErrors({});
        setSubmitted(false);

      }

      return (
        <>
        <div className="add-spot-form-box">
            <div className="add-spot-form"></div>
            <h2 className="show-and-tell">Show Me What You Got</h2>
          <form className="thinking-about-adding-spot" onSubmit={handleSubmit}>
            <div className="adding-new-spot-form">
            <label className="add-spot-form-label">
              Name
              <input
                className="adding-spot-inputs"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </label>
            {submitted && errors.name && <p>{errors.name}</p>}
            <label className="add-spot-form-label">
              Address
              <input
                className="adding-spot-inputs"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </label>
            {submitted && errors.address && <p>{errors.address}</p>}
            <label className="add-spot-form-label">
              City
              <input
                className="adding-spot-inputs"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </label>
            {submitted && errors.city && <p>{errors.city}</p>}
            <label className="add-spot-form-label">
              State
              <input
                className="adding-spot-inputs"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </label>
            {submitted && errors.state && <p>{errors.state}</p>}
            <label className="add-spot-form-label">
              Country
              <input
                className="adding-spot-inputs"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </label>
            {submitted && errors.country && <p>{errors.country}</p>}
            <label className="add-spot-form-label">
              Description
              <input
                className="adding-spot-inputs"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label>
            {submitted && errors.description && <p>{errors.description}</p>}
            <label className="add-spot-form-label">
              Price Per Night
              <input
                className="adding-spot-inputs"
                type="number"
                min="1"
                max="999999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
            </label>
            {submitted && errors.price && <p>{errors.price}</p>}
            <label className="add-spot-form-label">
              Preview Image
              <input
                className="adding-spot-inputs"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                />
            </label>
            {submitted && errors.firstName && <p>{errors.firstName}</p>}
            <label className="add-spot-form-label">
              Latitude
              <input
                className="adding-spot-inputs"
                type="number"
                min="-90"
                max="90"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                />
            </label>
            {submitted && errors.lat && <p>{errors.lat}</p>}
            <label className="add-spot-form-label">
              Longitude
              <input
                className="adding-spot-inputs"
                type="number"
                min="-180"
                max="180"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                />
            </label>
            {submitted && errors.lng && <p>{errors.lng}</p>}
            <button className="create-new-spot-button" type="submit">Add A Spot!</button>
            </div>
          </form>
    </div>
    </>
      );
}

export default AddSpot;
