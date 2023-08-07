import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spottingDetails } from "../../../store/spots";
import { getCurrentReviews, deletingReview } from "../../../store/reviews";
// import { getCurrentBookings } from "../../../store/bookings";
import { NavLink, useParams } from "react-router-dom";
import "./GetSpotDetails.css";

function GetSpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const user = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots.spot);
    const reviews = useSelector(state => {
        return state.reviews.allReviews.Reviews});
        console.log(reviews, typeof reviews, "WOEIJDOIWEJFOIWEJF")
    // const bookings = useSelector(state => Object.values(state.bookings.allBookings));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(spottingDetails(spotId))
        .then(() => dispatch(getCurrentReviews(spotId)))
        // .then(() => dispatch(getCurrentBookings(spotId)))
        .then(() => setIsLoaded(true))
    }, [dispatch, spotId]);

    // if (!spots && !reviews) return null;

    // const reviewsArr = Object.values(reviews);
    // let userReviews = reviewsArr.find(review => review.userId === user?.id);

    let spotImage;
    if (spots?.SpotsImage) {
        spotImage = spots?.SpotsImage?.map((picture) => {
            if (picture.preview) {
                return (
                    <img src={picture.url} alt="thisSpotPicture" key={`${picture.index}`} className=""/>
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
                    const month = review.createdAt.slice(0, 4);
                    const year = review.createdAt.slice(5, 7);
                    return (
                        <div className="" key={`${review?.id}`}>
                    <div className="">
                        {review.User?.firstName} {review.User?.lastName}
                    </div>
                    <div className="">
                        {getMonth(month)} {year}
                    </div>
                    <div className="">
                        {review?.review}
                    </div>
                </div>
            )
        })
    } else {
        if (user && (user?.id !== spots?.Owner?.i)) {
            reviewPosts =
            <div>
                <p>Be the first to post a review!</p>
            </div>
        }
    }

    let userHasReview = false;
    if (user && reviews) {
        for (let review of reviews) {
            if(review.userId === user.id) userHasReview = true;
        }
    }

    return isLoaded && spots && (
        <>
        <div className="this-one-spot">
            <div>
                <div>
                    {spots.name}
                    <div>
                        {spots?.city}, {spots?.state}, {spots?.country}
                    </div>
                    <div>
                        {spotImage}
                    </div>
                    <div>
                        <p>
                            Hosted by {spots?.Owner?.firstName} {spots?.Owner?.lastName}
                        </p>
                        <p>
                            {spots?.description}
                        </p>
                    </div>
                    <div>
                        <div>
                            Price: ${spots?.price} per Night
                        </div>
                        <div>
                            {spots?.avgStarRating} · {spots?.numReviews}
                        </div>
                        <button>Book!</button>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>New</h2>
                    </div>
                </div>
                <div>
                    {spots?.numReviews}
                </div>
                <div>
                    {user && (user?.id !== spots?.Owner?.id) && !userHasReview &&
                        <div>
                            <NavLink to={`/spots/${spots.id}/review`}>
                                <button>Add a Review!</button>
                            </NavLink>
                        </div>
                    }
                </div>
                <div>
                    {Object.values(reviews).map(review => (
                        <div>
                            <h4>{review.User.firstName}</h4>
                            <h4>{review.createdAt}</h4>
                            <p>{review.review}</p>
                            <button onClick={async (e) => {
                                e.preventDefault();
                                await dispatch(deletingReview(review.id))
                            }}>
                            Delete Review
                            </button>
                        </div>
                    ))}
                </div>
                {reviewPosts}
            </div>
        </div>
        </>
    )
}

export default GetSpotDetails;
