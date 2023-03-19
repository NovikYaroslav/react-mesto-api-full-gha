import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../utils/formValidator";
import Form from "./Form";
import Input from "./Input";

function EditAvatarProfile({ isOpen, onClose, onUpdateAvatar, message }) {
  const avatarRef = useRef();
  const formValidator = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    formValidator.resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        name="avatar"
        onSubmit={handleSubmit}
        isValid={formValidator.isValid}
        buttonText={message}
        formValidator={formValidator}
      >
        <Input
          type={"url"}
          name={"avatarLink"}
          placeholder={"Ссылка на аватар"}
          Ref={avatarRef}
          formValidator={formValidator}
        />
      </Form>
    </PopupWithForm>
  );
}

export default EditAvatarProfile;
