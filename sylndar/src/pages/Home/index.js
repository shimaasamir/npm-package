import logo from "../../logo-black.svg";

import "./style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";

export function HomePage() {
  const { t, i18next } = useTranslation();

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng).then((t) => {
      t("key"); // -> same as i18next.t
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{t("hello")}</h1>
        <button onClick={() => changeLanguage("ar")}>ar</button>
        <button onClick={() => changeLanguage("en")}>en</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div className="App-line"></div>

      <main className="App-main">
        <p>Page 1</p>

        <Link to="/page2" className="App-link">
          Next Page
        </Link>
      </main>
    </div>
  );
}
