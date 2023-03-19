import PopupWithForm from "./PopupWithForm";
import Form from "./Form";

function ConfirmationPopup({ card, isOpen, onClose, onConfirmation }) {
  function handleSubmit(e) {
    onConfirmation(card);
    e.preventDefault();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        name="confirmation"
        onSubmit={handleSubmit}
        isValid={true}
        buttonText="Да"
      />
    </PopupWithForm>
  );
}

export default ConfirmationPopup;
