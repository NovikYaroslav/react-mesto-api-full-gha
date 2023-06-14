import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import useFormWithValidation from '../utils/formValidator';
import Form from './Form';
import Input from './Input';

function AddPlacePopup({ isOpen, onClose, onAddPlace, message }) {
  const formValidator = useFormWithValidation();

  useEffect(() => {
    formValidator.resetForm();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: formValidator.values['name'],
      link: formValidator.values['link'],
    });
  }

  return (
    <PopupWithForm title='New mesto' name='card' isOpen={isOpen} onClose={onClose}>
      <Form
        name='card'
        onSubmit={handleSubmit}
        isValid={formValidator.isValid}
        buttonText={message}
        formValidator={formValidator}>
        <Input
          minLength={2}
          maxLength={30}
          type={'text'}
          name={'name'}
          placeholder={'Title'}
          formValidator={formValidator}
        />
        <Input type={'url'} name={'link'} placeholder={'Link'} formValidator={formValidator} />
      </Form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
