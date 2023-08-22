import React, { useState, useEffect } from "react";

import "./SearchForm.css";

function SearchForm() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="search">
      {windowWidth > 550 ? (
        <form className="search__form">
          <input className="search__input" type="search" placeholder="Фильм" />
          <button className="search__submit-button"></button>
          <div className="search__label">
            <input
              className="search__checkbox"
              id="toggle-button"
              type="checkbox"
            />
            <label className="search__text" htmlFor="toggle-button">
              Короткометражки
            </label>
          </div>
        </form>
      ) : (
        <div>
          <form className="search__form">
            <input
              className="search__input"
              type="search"
              placeholder="Фильм"
            />
            <button className="search__submit-button"></button>
          </form>
          <div className="search__label">
            <input
              className="search__checkbox"
              id="toggle-button"
              type="checkbox"
            />
            <label className="search__text" htmlFor="toggle-button">
              Короткометражки
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
