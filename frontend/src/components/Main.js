import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditAvatar,
  onAddPlace,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cardElement = cards.map((card) => {
    return (
      <Card
        key={`${card._id}`}
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    );
  });
  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            src="https://avatars.githubusercontent.com/u/109671896?v=4"
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            aria-label="Кнопка редатирования аватара"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Кнопка настройки профиля"
            onClick={onEditProfile}
          ></button>
          <h2 className="profile__discription">{currentUser.about}</h2>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Кнопка добавления карточки"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">{cardElement}</section>
    </main>
  );
}

export default Main;
