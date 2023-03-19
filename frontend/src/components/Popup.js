import { useEffect } from "react";
function Popup({ isOpen, name, card, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    function closeByEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup  popup_for_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div
        className={`${!card ? "popup__container" : "popup__photo-container"}`}
      >
        {children}
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default Popup;
