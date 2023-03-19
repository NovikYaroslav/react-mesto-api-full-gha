import success from "./../image/success.svg";
import fail from "./../image/fail.svg";
import Popup from "./Popup";

export default function InfoTooltip({ isOpen, onClose, isRegistrationSucced }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <img
        className="popup__status-sign"
        src={isRegistrationSucced ? success : fail}
        alt=""
      ></img>

      <h2 className="popup__status-title">
        {`${
          isRegistrationSucced
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."
        }`}
      </h2>
    </Popup>
  );
}
