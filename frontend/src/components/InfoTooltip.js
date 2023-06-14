import success from './../image/success.svg';
import fail from './../image/fail.svg';
import Popup from './Popup';

export default function InfoTooltip({ isOpen, onClose, isRegistrationSucced }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <img className='popup__status-sign' src={isRegistrationSucced ? success : fail} alt=''></img>

      <h2 className='popup__status-title'>
        {`${
          isRegistrationSucced
            ? 'You have successfully registered!'
            : 'Something went wrong! Try again.'
        }`}
      </h2>
    </Popup>
  );
}
