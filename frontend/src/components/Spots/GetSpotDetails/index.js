import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spottingDetails } from "../../../store/spots";
import { getCurrentReviews, deletingReview } from "../../../store/reviews";
import { NavLink, useParams, useHistory } from "react-router-dom";
import "./GetSpotDetails.css";

function GetSpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots.spot);
    const reviews = useSelector(state => {return state.reviews.allReviews.Reviews});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(spottingDetails(spotId))
        .then(() => dispatch(getCurrentReviews(spotId)))
        .then(() => setIsLoaded(true))
    }, [dispatch, spotId]);

    let spotImage;
    if (spots?.SpotsImage) {
        spotImage = spots?.SpotsImage?.map(picture => {
            if (picture.preview) {
                return (
                    <img src={picture.previewImage} alt="thisSpotPicture" className=""/>
                    )
            } else {
                return (
                    <div>Not Available</div>
                    )
            }
                })
    }

    const getMonth = (monthNum)  => {
        const date = new Date();
        date.setMonth(monthNum - 1);

        return date.toLocaleString('en-US');
    };

    let reviewPosts;
    if (reviews) {
        reviewPosts = Object.values(reviews).map((review) => {
            const year = review.createdAt.slice(0, 4);
            const month = review.createdAt.slice(5, 7);
            return (
                <div key={`${review?.id}`}>
                    <div>
                        {review.User?.firstName}
                    </div>
                    <div>
                        {getMonth(month)} {year}
                    </div>
                    <div>
                        {review?.review}
                    </div>
                </div>
            )
        })
    } else {
        if (user && (user?.id !== spots?.Owner?.id)) {
            return (
                <div>
                    <p>Be the first to post a review!</p>
                </div>
            )
        }
    }

    let userHasReview = false;
    if (user && reviews) {
        for (let review of reviews) {
            if(review.userId === user.id) userHasReview = true;
        }
    }

    return isLoaded && spots && (
        <div id="spot-container">
                <div>
                    <div id="spot-name">{spots.name}</div>
                    <div id="spot-location">
                        {spots?.city}, {spots?.state}, {spots?.country}
                    </div>
                    <div id="spot-image">
                        <img src={spots?.SpotsImages[0]?.url} alt="spotPicture" id="spot-picture">{spotImage}</img>
                    </div>
                    <div>
                        <p id="hosted-by">
                            Hosted by {spots?.Owner?.firstName} {spots?.Owner?.lastName}
                        </p>
                        <p id="description">
                            {spots?.description}
                        </p>
                    </div>
                    <div id="price-container">
                        <div id="price">
                            ${spots?.price} per Night
                        </div>
                        <div id="star-review">
                        {(spots?.numReviews < 1) &&
                            <div>
                                ★ New
                            </div>
                        }
                        {(spots?.numReviews >= 1) &&
                            <div id="review-section">
                                ★ {spots?.avgStarRating} · {spots?.numReviews} review(s)
                            </div>
                        }
                        </div>
                        <div>
                            <button id="reserve-button">Reserve</button>
                        </div>
                    </div>
                </div>
                <div id="line">
                        {(spots?.numReviews < 1) &&
                            <div>
                                ★ New
                            </div>
                        }
                        {(spots?.numReviews >= 1) &&
                            <div id="review-section">
                                ★ {spots?.avgStarRating} · {spots?.numReviews} review(s)
                            </div>
                        }
                </div>
                <div>
                    {user && (user?.id !== spots?.Owner?.id) && (userHasReview === false) &&
                        <div>
                            <NavLink to={`/spots/${spots.id}/review`}>
                                <button>Post Your Review</button>
                            </NavLink>
                        </div>
                    }
                </div>
                <div>
                    {user && Object.values(reviews).map(review => (
                        <div>
                            <h4>{review.User.firstName}</h4>
                            <h4>{review.createdAt}</h4>
                            <p>{review.review}</p>
                            <button onClick={async (e) => {
                                e.preventDefault();
                                await dispatch(deletingReview(review.id))
                                window.location.reload();
                            }}>
                            Delete Review
                            </button>
                        </div>
                    ))}
                </div>
                {reviewPosts}
        </div>
    )
}

export default GetSpotDetails;
