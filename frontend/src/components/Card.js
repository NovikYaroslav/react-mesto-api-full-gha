import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((likeOwner) => likeOwner === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked && 'element__like-button_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className='element'>
      {isOwn && (
        <button
          className='element__delete-button'
          type='button'
          aria-label='Card delete button'
          onClick={handleDeleteClick}></button>
      )}
      <img className='element__photo' src={card.link} alt={card.name} onClick={handleClick} />
      <div className='element__caption'>
        <h2 className='element__text'>{card.name}</h2>
        <div className='element__likes'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Card like button'
            onClick={handleLike}></button>
          <p className='element__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
