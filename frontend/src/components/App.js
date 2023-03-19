import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./../index";
import ProtectedRouteElement from "./ProtectedRoute";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarProfile from "./EditAvatarProfile";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import InfoTooltip from "./InfoTooltip";
import yandexApi from "../utils/api";
import authApi from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConformationPopupOpen, setisConformationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSucced, setIsRegistrationSucced] = useState();
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [avatarUpdateMessage, setAvatarUpdateMessage] = useState("Сохранить");
  const [profileUpdateMessage, setProfileUpdateMessage] = useState("Сохранить");
  const [placeAddMessage, setPlaceAddMessage] = useState("Создать");
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([yandexApi.getUserInfoFromServer(), yandexApi.getCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    tokenCheck();
  },[]);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(`${res.data.email}`);
          navigate("/", { replace: true });
        }
      });
    }
  }

  function handleRegistration(email, password) {
    authApi
      .register(email, password)
      .then(() => {
        setIsRegistrationSucced(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        setIsRegistrationSucced(false);
        setIsInfoTooltipOpen(true);
        console.log(error);
      });
  }

  function handleAuthorization(email, password) {
    authApi
      .authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleLogout() {
    if (loggedIn) {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
      navigate("/sign-up", { replace: true });
    }
    if (window.location.pathname === "/sign-in") {
      navigate("/sign-up", { replace: true });
    } else {
      navigate("/sign-in", { replace: true });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisConformationPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsImagePopupOpen(false)
  }

  function handleCardClick(openedCard) {
    setSelectedCard(openedCard);
    setIsImagePopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    yandexApi
      .changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }

  function handleCardDeleteConfirmation(card) {
    yandexApi
      .deleteCard(card._id)
      .then(() => {
        closeAllPopups();
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(cardToDelete) {
    setCardToDelete(cardToDelete);
    setisConformationPopupOpen(true);
  }

  function handleUpdateUser(profilePopupInputsData) {
    setProfileUpdateMessage("Сохранение...");
    yandexApi
      .editUserInfo(profilePopupInputsData)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: profilePopupInputsData.name,
          about: profilePopupInputsData.about,
        });
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setProfileUpdateMessage("Сохранить");
      });
  }

  function handleAddPlaceSubmit(addedCard) {
    setPlaceAddMessage("Создаю...");
    yandexApi
      .addCards(addedCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setPlaceAddMessage("Создать");
      });
  }

  function handleUpdateAvatar(avatarPopupInputsData) {
    setAvatarUpdateMessage("Сохранение...");
    yandexApi
      .editUserAvatar(avatarPopupInputsData)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: avatarPopupInputsData.avatar,
        });
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setAvatarUpdateMessage("Сохранить");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/main" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegistration} />}
          />
          <Route
            path="/sign-in"
            element={<Login onAuthoriz={handleAuthorization} />}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          message={profileUpdateMessage}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          message={placeAddMessage}
        />
        <EditAvatarProfile
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          message={avatarUpdateMessage}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="conformation"
          buttonText="Да"
        />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <ConfirmationPopup
          isOpen={isConformationPopupOpen}
          onClose={closeAllPopups}
          onConfirmation={handleCardDeleteConfirmation}
          card={cardToDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegistrationSucced={isRegistrationSucced}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
