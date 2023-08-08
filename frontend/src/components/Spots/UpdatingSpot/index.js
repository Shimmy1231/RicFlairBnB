import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from "react-router-dom";
// import { deletingSpot, getPersonalSpot } from '../../store/session';
import { deletingSpot, getPersonalSpot } from "../../../store/spots";
import './UpdatingSpot.css'

function UpdatingSpot () {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const thatSpot = useSelector(state => state.spots.spot);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(thatSpot(spotId))
    }, [dispatch, spotId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
            await dispatch(deletingSpot(thatSpot, spotId));
            history.push(`/spots/${spotId}`)

        await dispatch(getPersonalSpot());
    };

    return (
        <div>
            <h1>Confirm Delete?</h1>
            <div>
                <p>Are You Sure?</p>
                {errors && <p>{errors.message}</p>}
                <button onClick={handleSubmit}>YES</button>
            </div>
        </div>
    )
}

export default UpdatingSpot;
