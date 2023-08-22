import Section from "../Section/Section";

import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs" aria-label="Технологии">
      <Section name={"Технологии"} />
      <div className="techs__container">
        <h2 className="techs__subtitle">7&nbsp;технологий</h2>
        <p className="techs__description">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
          применили в&nbsp;дипломном проекте.
        </p>
      </div>
      <ul className="techs__list">
        <li className="techs__list-item">HTML</li>
        <li className="techs__list-item">CSS</li>
        <li className="techs__list-item">JS</li>
        <li className="techs__list-item">React</li>
        <li className="techs__list-item">Git</li>
        <li className="techs__list-item">Express.js</li>
        <li className="techs__list-item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
