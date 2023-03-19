import useFormWithValidation from "../utils/formValidator";
import Form from "./Form";
import Input from "./Input";

export default function Login({ onAuthoriz }) {
  const formValidator = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAuthoriz(formValidator.values["Email"], formValidator.values["Password"]);
    formValidator.resetForm();
  }

  return (
    <div className="entry">
      <div className="entry__container">
        <h2 className="entry__title">Вход</h2>
        <Form
          name="email"
          onSubmit={handleSubmit}
          isValid={formValidator.isValid}
          buttonText="Войти"
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
      </div>
    </div>
  );
}
