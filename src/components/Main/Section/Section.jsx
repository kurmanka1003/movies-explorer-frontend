import "./Section.css";

function Section({ name }) {
  return (
    <div className="section">
      <h3 className="section__title">{name}</h3>
    </div>
  );
}

export default Section;
