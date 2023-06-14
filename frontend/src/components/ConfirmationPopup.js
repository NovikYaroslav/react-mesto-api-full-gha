import PopupWithForm from './PopupWithForm';
import Form from './Form';

function ConfirmationPopup({ card, isOpen, onClose, onConfirmation }) {
  function handleSubmit(e) {
    onConfirmation(card);
    e.preventDefault();
  }

  return (
    <PopupWithForm title='You sure?' name='confirmation' isOpen={isOpen} onClose={onClose}>
      <Form name='confirmation' onSubmit={handleSubmit} isValid={true} buttonText='Yes' />
    </PopupWithForm>
  );
}

export default ConfirmationPopup;
