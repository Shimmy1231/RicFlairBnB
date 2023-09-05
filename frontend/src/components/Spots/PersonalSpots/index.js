import { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalSpot, deletingSpot } from '../../../store/spots';
import './PersonalSpots.css'

function PersonalSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setLoaded] = useState(false)
    useEffect(() => {
        dispatch(getPersonalSpot()).then(() => setLoaded(true))
    }, [dispatch])

    const spots = useSelector(state => {
        return state.spots.allSpots.Spots});
    let spotsArr = Object.values(spots);
    return isLoaded && (
        <>
        <div className="personal-spots-box">
            <h1 className="personal-spots-title">My Spots</h1>
            <div className="personal-spots-list-by-list">
                {spotsArr.map((e) => (
                    <div className="i-own-these-spots" key={e.id}>
                        <NavLink to={`/spots/${e.id}`} className="link-to-personal-spots">
                            <div>
                                <div>
                                    <img src={`${e.previewImage}`} alt="thinkthisismyspot" className="personal-spot-picture-single"/>
                                </div>
                                <div className="personal-spot-data">
                                    <div className="personal-spot-name-and-otherthings">{e.name}</div>
                                    <div className="personal-spot-name-and-otherthings">{e.city}, {e.state}, {e.country}</div>
                                    <div className="personal-spot-name-and-otherthings">${e.price} Per Night</div>
                                </div>
                            </div>
                        </NavLink>
                        <div className="personal-spot-button-edit">
                            <NavLink to={`/spots/${e.id}/edit`}>
                                <button className="personal-spot-edit-button">
                                    Edit Your Listing
                                </button>
                            </NavLink>
                            <button className="" onClick={async (el) => {
                                el.preventDefault();
                                const terminated = await dispatch(deletingSpot(e.id));
                                if (terminated) history.push("/")
                            }}>
                            Delete Your Listing
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default PersonalSpots;
