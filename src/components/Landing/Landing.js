import LayoutMain from '../Layout/LayoutMain';
import DateTimeTile from '../Tiles/DateTimeTile/DateTimeTile';
import SearchBar from '../SearchBar/SearchBar';
// Assets
import landingBkground from '../../assets/Img/Landing.jpg';
import './Landing.scss';

const Landing = () => {
  return (
    <LayoutMain className={"layout__container--landing"} backgroundImage={landingBkground}>
      <section className="landing">
        <header className="landing__heading">
          <h1>Weatherly</h1>
          <h2>Stay ahead of the weather</h2>
        </header>

        <article className="landing__content">
          <DateTimeTile />
          <SearchBar />
        </article>
      </section>
    </LayoutMain>
  );
};

export default Landing;