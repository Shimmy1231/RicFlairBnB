import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addingReview, getCurrentReviews } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import './AddReview.css'

function AddReview () {
  const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState({});
  const spotId = useParams().spotId;
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let reviews = {review, stars};
    dispatch(addingReview(reviews, spotId))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    })
    .then(dispatch(getCurrentReviews(spotId)));
    history.push(`/spots/${spotId}`)
  }

  return (
    <form onSubmit={handleSubmit} id="review-form">
      <div>How was your stay?</div>
      <label id="input-labels">
        Reviews :
        <input
          type="text"
          id="inputs"
          value={review}
          placeholder='Leave your review here'
          maxlength="250"
          onChange={(e)=> setReview(e.target.value)}
        />
      </label>
      <label id="input-labels">
        Stars :
        <select onChange={e => setStars(e.target.value)} id="inputs">
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </label>
      <div>{errors.stars && <p>{errors.stars}</p>}</div>
      <div>{errors.reviews && <p>{errors.reviews}</p>}</div>
      <button type="submit" id="button-for-review"
      disabled={
        review.length < 10
      } onClick={handleSubmit}
    >Submit Your Review</button>
    </form>
  )
}

export default AddReview;
