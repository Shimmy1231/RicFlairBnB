import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const GET_ONE_SPOT = "spots/getOneSpot";
const UPDATE_SPOT = "spots/updateSpot";
const ADD_SPOT = "spots/addSpot";
const DELETE_SPOT = "spots/deleteSpot";

const loadAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
};

const loadOneSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot
    }
};

const updateSpot = (spots) => {
    return {
        type: UPDATE_SPOT,
        payload: spots
    }
};

const addSpot = (spots) => ({
    type: ADD_SPOT,
    payload: spots
});

const deleteSpot = () => ({
    type: DELETE_SPOT
});

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("api/spots", {
        method: "GET",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllSpots(data));
        return data;
    };
};

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}`, {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loadOneSpot(data));
    };
};

export const updatingSpot = (spot, spotId) => async (dispatch) => {
    const { url } = spot;

    const response = await csrfFetch(`api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify({
            spot
        })
    });
    if (response.ok) {
        const data = await response.json();

        const spotIdResponse = await csrfFetch(`api/spots/${spot.id}/images`, {
            method: "POST",
            body: JSON.stringify({
                url,
                preview: true
            })
        });
        if (spotIdResponse.ok) {
            const chosenSpotImage = await spotIdResponse.json();
            spot.SpotsImage = [chosenSpotImage];
            dispatch(updateSpot(data));
            return data;
        };
    };
};

export const addingSpot = (spot) => async (dispatch) => {
    const { url } = spot;

    const response = await csrfFetch(`api/spots/${spot}`, {
        method: "POST",
        body: JSON.stringify({
            spot
        })
    });

    if (response.ok) {
        const data = await response.json();

        const spotIdResponse = await csrfFetch(`api/spots/${spot.id}/images`, {
            method: "POST",
            body: JSON.stringify({
                url,
                preview: true
            })
        });
        if (spotIdResponse.ok) {
            const chosenSpotImage = await spotIdResponse.json();
            spot.SpotsImage = [chosenSpotImage];
            dispatch(addSpot(data));
            return data;
        };
    };
};

export const deletingSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteSpot());
        return data;
    }
};

const initialState = { spot: {}, allSpots: {} }

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = Object.assign({}, state);
            newState.allSpots = action.spots.Spots;
            return newState;
        case GET_ONE_SPOT:
            newState = Object.assign({}, state);
            newState.spot = action.spot;
            return newState;
        case UPDATE_SPOT:
            newState = Object.assign({}, state);
            newState.spot = action.payload;
            return newState;
        case ADD_SPOT:
            newState = Object.assign({}, state);
            newState.spot = action.payload;
            return newState;
        case DELETE_SPOT:
            newState = Object.assign({}, state);
            newState.spot = null;
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
