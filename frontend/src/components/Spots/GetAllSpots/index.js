import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../../store/spots";
import { NavLink } from "react-router-dom";
import "./GetAllSpots.css";

function GetAllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state =>
        {return state.spots.allSpots.Spots});
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(getAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);

    if (!spots) return null;
    const data = Object.values(spots).map(spot => {
        return (
            <div className="all-spots">
                <NavLink to={`/spots/${spot.id}`} className="single-spot-link">
                    <div>
                        <img src={spot.previewImage} alt='usethisimage' className="each-spot-image"/>
                    </div>
                    <div key={spot.name} className="display-city-and-state">
                        {spot.city}, {spot.state}
                    </div>
                    <div className="all-spots-avgStars">
                        ★ {spot.avgStarRating}
                    </div>
                    <div className="all-spots-availability">
                        August 13 - 20
                    </div>
                    <div className="all-spots-pricing">
                        {spot.price}
                    </div>
                </NavLink>
            </div>
        )
    })

    return isLoaded && (
            <div className="get-all-spots">
                {data}
            </div>
        )

}

export default GetAllSpots;
