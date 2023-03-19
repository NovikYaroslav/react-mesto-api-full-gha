import mestoLogo from "./../image/mesto-logo.svg";

function Header({ loggedIn, userEmail, handleLogout }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={mestoLogo}
        alt="Логотип проекта Место"
      />
      <div className="login-bar">
        <p className="login-bar__user-email">{`${
          loggedIn ? userEmail : ""
        }`}</p>
        <button onClick={handleLogout} className="login-bar__button">
          {window.location.pathname == "/sign-in"
            ? "Регистрация"
            : loggedIn
            ? "Выйти"
            : "Войти"}
        </button>
      </div>
    </header>
  );
}

export default Header;
