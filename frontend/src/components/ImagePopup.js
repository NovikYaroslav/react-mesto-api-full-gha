import Popup from "./Popup";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <Popup card={card} isOpen={isOpen} onClose={onClose} name="photo">
      <img className="popup__photo" src={`${card.link}`} alt={`${card.name}`} />
      <figcaption className="popup__photo-capture">{card.name}</figcaption>
    </Popup>
  );
}

export default ImagePopup;
