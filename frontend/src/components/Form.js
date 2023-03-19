function Form({
  name,
  onSubmit,
  isValid,
  buttonText,
  children,
  blackBackground,
}) {
  return (
    <form
      className="forms"
      name={`user-${name}`}
      onSubmit={onSubmit}
      noValidate
    >
      <fieldset className="forms-fieldset">{children}</fieldset>
      <button
        className={`${!blackBackground ? "forms__save" : "forms__save_entry"} ${
          !isValid && !blackBackground ? "forms__save_inactive" : ""
        }`}
        type="submit"
        disabled={!isValid}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
