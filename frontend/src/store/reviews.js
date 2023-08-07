import { csrfFetch } from ".csrf";

const GET_REVIEWS = "reviews/getReviews";
const ADD_REVIEW = "reviews/addReview";
const DELETE_REVIEW = "reviews/deleteReview";

const loadAllReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
};

const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
});

const deleteReview = () => ({
    type: DELETE_REVIEW
});

export const getCurrentReviews = () => async (dispatch) => {
    const response = await csrfFetch("api/reviews/current", {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllReviews(data));
        return data;
    }
};

export const addingReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data;
    }
};

export const deletingReview = () => async (dispatch) => {
    const response = await csrfFetch(`api/reviews/${reviewId}`,{
        method: "DELETE"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReview());
        return data;
    }
};

const initialState = { review: {}, allReviews: {} }

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = Object.assign({}, state);
            newState.allReviews = action.reviews;
            return newState;
        case ADD_REVIEW:
            newState = Object.assign({}, state);
            newState.review = action.review;
            return newState;
        case DELETE_REVIEW:
            newState = Object.assign({}, state);
            newState.review = null;
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;
