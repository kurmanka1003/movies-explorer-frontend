import Section from "../Section/Section";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section
      className="about-project"
      id="about-project"
      aria-label="О проекте"
    >
      <Section name={"О проекте"} />
      <div className="about-project__container">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            Дипломный проект включал&nbsp;5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            На&nbsp;выполнение диплома ушло&nbsp;5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__container-line">
        <div className="about-project__line about-project__line-green">
          <span
            className="about-project__span about-project__span-week"
            style={{ color: "#000000" }}
          >
            1 неделя
          </span>
          <span className="about-project__span about-project__span-develope">
            Back-end
          </span>
        </div>
        <div className="about-project__line about-project__line-grey">
          <span className="about-project__span about-project__span-week">
            4 недели
          </span>
          <span className="about-project__span about-project__span-develope">
            Front-end
          </span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
