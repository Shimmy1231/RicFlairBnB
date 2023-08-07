import { csrfFetch } from ".csrf";

const GET_CURRENT_BOOKINGS = "bookings/getCurrentBookings";
const ADD_BOOKING = "bookings/addBooking";
const UPDATE_BOOKING = "bookings/editBooking"
const DELETE_BOOKING = "bookings/deleteBooking";

const loadAllBookings = (bookings) => {
    return {
        type: GET_CURRENT_BOOKINGS,
        bookings
    }
};

const addBooking = (booking) => ({
    type: ADD_BOOKING,
    payload: booking
});

const updateBooking = (booking) => {
    return {
        type: UPDATE_BOOKING,
        payload: booking
    }
};

const deleteBooking = () => ({
    type: DELETE_BOOKING
});

export const getCurrentBookings = () => async (dispatch) => {
    const response = await csrfFetch("api/bookings/current", {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllBookings(data));
        return data;
    }
};

export const addingBooking = (booking, spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}/newBooking`, {
        method: "POST",
        body: JSON.stringify({
            booking
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addBooking(data));
        return data;
    }
};

export const updatingBooking = (booking, bookingId) => async (dispatch) => {
    const response = await csrfFetch(`api/bookings/${bookingId}`, {
        method: "PUT",
        body: booking
    });
    if (response.ok) {
        const data = response.json();
        dispatch(updateBooking(data));
        return data;
    }
};

export const deletingBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`api/bookings/${bookingId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const data = response.json();
        dispatch(deleteBooking());
        return data;
    }
};

const initialState = { booking: {}, allBookings: {} }

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CURRENT_BOOKINGS:
            newState = Object.assign({}, state);
            newState.allBookings = action.bookings;
            return newState;
        case ADD_BOOKING:
            newState = Object.assign({}, state);
            newState.booking = action.booking;
            return newState;
        case UPDATE_BOOKING:
            newState = Object.assign({}, state);
            newState.booking = action.booking;
            return newState;
        case DELETE_BOOKING:
            newState = Object.assign({}, state);
            newState.booking = null;
            return newState;
        default:
            return state;
    }
};

export default bookingsReducer;
