import Navigation from "../Navigation/Navigation";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Footer from "../Footer/Footer";

import "./Main.css";

function Main() {
  return (
    <>
      <Navigation />
      <Promo />
      <main className="main">
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
