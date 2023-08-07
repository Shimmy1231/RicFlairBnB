import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../../store/spots";
import { NavLink } from "react-router-dom";
import "./GetAllSpots.css";

function GetAllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => {
        return state.spots.allSpots;
    });
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(getAllSpots()).then(() => setIsLoaded(true));
      }, [dispatch]);

    if (!spots) return null;
    console.log(spots);
    const data = spots.Spots.map(spot => {
        return (
            <div className="all-spots">
                <NavLink to={`/spots/${spot.id}`} className="single-spot-link">
                    <div className="single-spot-display">
                        <div>

                        </div>
                    </div>
                </NavLink>
            </div>
        )
    })

    return (
        isLoaded && (
            {data}
        )
    )
}

export default GetAllSpots;
