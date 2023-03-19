function Input({
  minLength,
  maxLength,
  type,
  name,
  placeholder,
  Ref,
  formValidator,
  blackBackground,
}) {
  return (
    <>
      <input
        className={`forms-fieldset__input register-fieldset__input_value_name ${
          blackBackground ? "forms-fieldset__input_white" : ""
        }`}
        required
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        name={name}
        placeholder={placeholder}
        value={formValidator.values[name] || ""}
        onChange={formValidator.handleChange}
        ref={Ref}
      />
      <span className="forms-fieldset__error">
        {formValidator.errors[name]}
      </span>
    </>
  );
}

export default Input;
