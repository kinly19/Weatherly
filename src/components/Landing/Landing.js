import { useRef } from 'react';
import LayoutMain from '../Layout/LayoutMain';
import DateTimeTile from '../Tiles/DateTimeTile/DateTimeTile';
import SearchBar from '../SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
// Assets
import landingBkground from '../../assets/Img/Landing.jpg';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Landing.scss';

const Landing = (props) => {
  const modalRef = useRef();

  return (
    <LayoutMain className={"layout__container--landing"} backgroundImage={landingBkground}>
      <section className="landing">
        <header className="landing__heading">
          <h1>Weatherly</h1>
          <h2>Stay ahead of the weather</h2>
        </header>

        <article className="landing__content">
          <DateTimeTile />
          <SearchBar handleSubmit={props.handleSubmit}/>
          {props.loading && <LoadingSpinner />}
        </article>
      </section>

      {/* Error modal */}
      {props.onError.hasError && (
        <Modal
          ref={modalRef}
          toggleOnError={props.onError}
          onClick={() => modalRef.current.toggleOverlayHandler()}
        >
          <ErrorAlert errorMsg={props.onError.errorMsg}/>
        </Modal>
      )}
    </LayoutMain>
  );
};

export default Landing;