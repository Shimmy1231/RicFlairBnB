import { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalSpot, deletingSpot } from '../../../store/spots';
import './PersonalSpots.css'

function PersonalSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => {return state.spots.allSpots.Spots});
    const [isLoaded, setLoaded] = useState(false)
    const spotsArr = Object.values(spots);

    useEffect(() => {
        dispatch(getPersonalSpot())
        .then(() => setLoaded(true))
    }, [dispatch])

    return isLoaded && spots && (
        <div id="personal-spots-box">
            <h1 id="personal-spots-title">Manage Spots</h1>
            <div id="personal-spots-list-by-list">
                {spotsArr.map((e) => (
                    <div id="my-spots" key={e.id}>
                        <NavLink to={`/spots/${e.id}`} id="link-to-personal-spots">
                            <div>
                                <div>
                                    <img src={`${e.previewImage}`} alt="My Spot" id="per-spot-img"/>
                                </div>
                                <div id="d-container">
                                    <div id="spot-descriptions">{e.city}, {e.state}, {e.country}</div>
                                    <div id="spot-descriptions">${e.price} Night</div>
                                </div>
                                    <div id="star-review">
                                    {(e.avgStarRating == 0) &&
                                        <div>
                                            ★ New
                                        </div>
                                    }
                                    {(e.avgStarRating >= 1) &&
                                        <div id="review-section">
                                            ★ {e.avgStarRating}
                                        </div>
                                    }
                                    </div>
                            </div>
                        </NavLink>
                        <div className="personal-spot-button-edit">
                            <NavLink to={`/spots/${e.id}/edit`}>
                                <button className="personal-spot-edit-button">
                                    Update
                                </button>
                            </NavLink>
                            <button className="personal-spot-edit-button" onClick={async (el) => {
                                el.preventDefault();
                                const terminated = await dispatch(deletingSpot(el.id));
                                if (terminated) history.push("/")
                            }}>
                            Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PersonalSpots;
