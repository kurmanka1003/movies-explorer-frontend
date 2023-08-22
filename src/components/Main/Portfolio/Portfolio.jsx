import "./Portfolio.css";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <div className="portfolio">
      <span className="portfolio__title">Портфолио</span>
      <div className="portfolio__container">
        <Link
          className="portfolio__link"
          to="https://github.com/kurmanka1003/how-to-learn"
          target="_blank"
        >
          Статичный сайт
          <div className="portfolio__link-icon" />
        </Link>
        <Link
          className="portfolio__link"
          to="https://github.com/kurmanka1003/russian-travel"
          target="_blank"
        >
          Адаптивный сайт
          <div className="portfolio__link-icon" />
        </Link>
        <Link
          className="portfolio__link"
          to="https://github.com/kurmanka1003/react-mesto-api-full-gha"
          target="_blank"
        >
          Одностраничное приложение
          <div className="portfolio__link-icon" />
        </Link>
      </div>
    </div>
  );
}

export default Portfolio;
