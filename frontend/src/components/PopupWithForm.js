import Popup from "./Popup";

function PopupWithForm({ title, name, isOpen, onClose, children }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2
        className={`popup__title ${
          name === "confirmation" && "popup__title_confirm"
        }`}
      >
        {title}
      </h2>

      {children}
    </Popup>
  );
}

export default PopupWithForm;
