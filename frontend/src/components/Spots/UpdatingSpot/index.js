import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatingSpot, getOneSpot } from '../../../store/spots'
import { useParams, useHistory } from 'react-router-dom'
import './UpdatingSpot.css';

function UpdatingSpot () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const thisSpot = useSelector(state => state.spots.spot)
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        setAddress(thisSpot.address);
        setCity(thisSpot.city);
        setState(thisSpot.state);
        setCountry(thisSpot.country);
        setLat(thisSpot.lat);
        setLng(thisSpot.lng);
        setName(thisSpot.name);
        setPrice(thisSpot.price);
        setDescription(thisSpot.description);
        setUrl(thisSpot.url);
        setImgURL(thisSpot.imgURL);

    }, [thisSpot]);

    useEffect(() => {
        const errors = {};
        if (!name) errors.name = 'Must include Spot Name';
        if (!address) errors.address = 'Must include Address';
        if (!city) errors.city = 'Must include City';
        if (!state) errors.state = 'Must include State';
        if (!country) errors.country = 'Must include Country';
        if (!description) errors.description = 'Must include Description';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!price) errors.price = 'Must include Price';
        if (!url) errors.url = 'Must include Url';

        setErrors(errors)

    }, [name, address, city, state, country, description, price, url, lat, lng])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!errors.length) {
          const potentialSpot = { name, address, city, state, country, description, price, url, lat, lng };
          const newSpot = await dispatch(updatingSpot(potentialSpot));
          newSpot.SpotImages = [{ url: url }]
          if (newSpot) {
            history.push(`/spots/${newSpot.id}`)
            window.location.reload()
          }
        }

        setErrors({});
        setSubmitted(false);
      }
    return (
        <div className="add-spot-form-container">
          <form className="add-spot-form" onSubmit={handleSubmit}>
          <h1>Update Spot</h1>
          <p id="location-font">Where's your place located?</p>
          <p id="description-font">Guests will only get your exact address once they booked a reservation.</p>
            <div>
            <div>
              <label>Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  />
            {submitted && errors.country && <p>{errors.country}</p>}
            <label>Street Address</label>
              <input
                className="adding-spot-inputs"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            {submitted && errors.address && <p>{errors.address}</p>}
            </div>
            <label>City</label>
              <input
                className="adding-spot-inputs"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            {submitted && errors.city && <p>{errors.city}</p>}
            <label>State</label>
              <input
                className="adding-spot-inputs"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            {submitted && errors.state && <p>{errors.state}</p>}
            <label>Latitude</label>
              <input
                className="adding-spot-inputs"
                type="number"
                min="-90"
                max="90"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                />
            {submitted && errors.lat && <p>{errors.lat}</p>}
            <label>Longitude</label>
              <input
                className="adding-spot-inputs"
                type="number"
                min="-180"
                max="180"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                />
            {submitted && errors.lng && <p>{errors.lng}</p>}
            <div id="line"></div>
            <p id="location-font">Describe your place to guests</p>
            <p id="description-font">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
            <label>Description</label>
              <input
                className="adding-spot-inputs"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            {submitted && errors.description && <p>{errors.description}</p>}
            <div id="line"></div>
            <p id="location-font">Create a Title for your Spot</p>
            <p id="description-font">Catch guests' attention with a spot title that highlights what makes your place special</p>
            <label>Name of your spot</label>
              <input
                className="adding-spot-inputs"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            {submitted && errors.name && <p>{errors.name}</p>}
            <div id="line"></div>
            <p id="location-font">Set a base price for your spot</p>
            <p id="description-font">Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <label>Price Per Night (USD)</label>
            <div>$
              <input
                className="adding-spot-inputs"
                type="number"
                min="1"
                max="999999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
            </div>
            {submitted && errors.price && <p>{errors.price}</p>}
            <div id="line"></div>
            <p id="location-font">Liven up your spot with photos</p>
            <p id="description-font">Submit a link to at least one photo to publish your spot.</p>
            <label>Preview Image URL</label>
              <input
                className="adding-spot-inputs"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                />
            {submitted && errors.url && <p>{errors.url}</p>}
            <label>Image URL</label>
              <input
                className="adding-spot-inputs"
                type="text"
                value={imgURL}
                onChange={(e) => setImgURL(e.target.value)}
                required
                />
            {submitted && errors.imgURL && <p>{errors.imgURL}</p>}
            <div id="line"></div>
            <div id="submit-addspot">
              <button type="submit" onClick={handleSubmit}>Update Spot</button>
            </div>
            </div>
          </form>
        </div>
    );
}
export default UpdatingSpot;
