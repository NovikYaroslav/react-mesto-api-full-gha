import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../utils/formValidator";
import Form from "./Form";
import Input from "./Input";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, message }) {
  const currentUser = useContext(CurrentUserContext);
  const formValidator = useFormWithValidation();

  useEffect(() => {
    formValidator.resetForm(
      { userName: currentUser.name, about: currentUser.about },
      {},
      true
    );
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: formValidator.values.userName,
      about: formValidator.values.about,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        name="profile"
        onSubmit={handleSubmit}
        isValid={formValidator.isValid}
        buttonText={message}
        formValidator={formValidator}
      >
        <Input
          minLength={2}
          maxLength={40}
          type={"text"}
          name={"userName"}
          placeholder={"Как Вас зовут?"}
          formValidator={formValidator}
        />
        <Input
          minLength={2}
          maxLength={200}
          type={"text"}
          name={"about"}
          placeholder={"Кратко о себе"}
          formValidator={formValidator}
        />
      </Form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
