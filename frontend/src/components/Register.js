import { Link } from "react-router-dom";
import useFormWithValidation from "../utils/formValidator";
import Form from "./Form";
import Input from "./Input";

export default function Register({ onRegister }) {
  const formValidator = useFormWithValidation();
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValidator.values["Email"], formValidator.values["Password"]);
    formValidator.resetForm();
  }

  return (
    <div className="entry">
      <div className="entry__container">
        <h2 className="entry__title">Регистрация</h2>
        <Form
          name="email"
          onSubmit={handleSubmit}
          isValid={formValidator.isValid}
          buttonText="Зарегистрироваться"
          blackBackground={true}
        >
          <Input
            minLength={"2"}
            maxLength={"50"}
            type={"email"}
            name={"Email"}
            placeholder={"Email"}
            formValidator={formValidator}
            blackBackground={true}
          />
          <Input
            minLength={"2"}
            maxLength={"200"}
            type={"password"}
            name={"Password"}
            placeholder={"Пароль"}
            formValidator={formValidator}
            blackBackground={true}
          />
        </Form>
        <p className="entry__question">
          Уже зарегистрированы?
          <Link to="/sign-in" className="entry__login-button">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
