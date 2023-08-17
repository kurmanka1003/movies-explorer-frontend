import Section from "../Section/Section";
import Portfolio from "../Portfolio/Portfolio";
import myPhoto from "../../../images/photo.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me" id="about-me" aria-label="Обо мне">
      <Section name={"Студент"} />
      <div className="about-me__content">
        <div className="about-me__container">
          <h2 className="about-me__name">Румия</h2>
          <p className="about-me__profession">Фронтенд-разработчик, 22 года</p>
          <p className="about-me__description">
            Родилась в Элисте, живу в Москве 4 года. Окончила университет и
            получила степень бакалавра по направлению "Информатика и
            вычислительная техника". Люблю игры, космологию и слушать рок.
            Решила попробовать себя в веб-разработке и планирую дальше
            развиваться в этом направлении.
          </p>
          <a
            className="about-me__github-link"
            href="https://github.com/kurmanka1003"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Моя фотография" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
