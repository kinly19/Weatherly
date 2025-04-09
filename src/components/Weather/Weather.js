import { useState, useMemo, useRef } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import useDate from '../../hooks/useDate';
// Components
import LayoutMain from '../Layout/LayoutMain';
import SearchBar from '../SearchBar/SearchBar';
import CurrentWeatherTile from '../Tiles/CurrentWeatherTile/CurrentWeatherTile';
import StatList from '../StatList/StatList';
import Carousel from '../Carousel/Carousel';
import HourlyCard from '../Cards/HourlyCard';
import Pagination from '../Pagination/Pagination';
import Accordion from '../Accordion/Accordion';
import Modal from '../Modal/Modal';
import WeatherAlert from '../WeatherAlert/WeatherAlert';
import WeatherAlertAccordion from '../WeatherAlert/WeatherAlertAccordion';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
// Assets
import './Weather.scss';

const Weather = (props) => {
  const {date} = useDate()
  const {currentConditions, days} = props.data; // Weather data via props
  
  // Pagination
  const [currentWeek, setCurrentWeek] = useState(1)
  const [daysPerPage, setDaysPerPage] = useState(7)
  const indexOfLastDay = currentWeek * daysPerPage;
  const indexOfFirstDay = indexOfLastDay - daysPerPage;
  
  const currenDays = days.slice(1).slice(indexOfFirstDay, indexOfLastDay);
  const hasWeatherAlerts = props.data.alerts.length > 0;
  console.log(props.data.alerts);
  
  // Refs
  const modalRef = useRef();
  const modalErrRef = useRef();
  const paginationRef = useRef();

  // Memoize randomIndex value
  const randomIndex = useMemo(
    () => Math.floor(Math.random() * props.data.backgroundUrls.length),
    [props.data.backgroundUrls]
  );

  // Handle pagination
  const paginateHandler = async (number) => {
    setCurrentWeek(number);
    paginationRef.current.scrollIntoView({behavior: "smooth"});
  };

  const capitalizeWordsHandler = (str) => {
    const words = str.split(" ");
    const capitalizedWord = words.map(word => word[0].toUpperCase() + word.slice(1));
    return capitalizedWord.join(" ");
  }
  
  return (
    <LayoutMain
      className={"weather"}
      backgroundImage={props.data.backgroundUrls[randomIndex]}
    >
      <header className="weather__search">
        <SearchBar loading={props.loading} handleSubmit={props.handleSubmit} />
      </header>

      {/* Current weather */}
      <CurrentWeatherTile
        className={"weather__current-main"}
        resolvedAddress={props.data.resolvedAddress}
        datetimeEpoch={currentConditions.datetimeEpoch}
        temp={currentConditions.temp}
        condition={currentConditions.condition}
        icon={currentConditions.icon}
      />
      {/* Current stats */}
      <StatList className={"weather__current-list"} {...currentConditions} />

      {/* hourly weather */}
      <Carousel className={"weather__current-hourly"}>
        {days[0].hours.slice(date.getHours()).map((hourlyData, index) => {
          return <HourlyCard key={index} {...hourlyData} />;
        })}
      </Carousel>

      {/* Daily weather */}
      <Pagination
        className="weather__current-daily"
        ref={paginationRef}
        paginate={paginateHandler}
      >
        {currenDays.map((dailyData) => {
          return (
            <Accordion
              datetimeEpoch={dailyData.datetimeEpoch}
              condition={dailyData.condition}
              temp={dailyData.temp}
              rain={dailyData.rain}
              icon={dailyData.icon}
            >
              <StatList
                statTileClassName={"stat-tile stat-tile--pd-sm"}
                {...dailyData}
              />
            </Accordion>
          );
        })}
      </Pagination>

      {/* Weather alerts modal */}
      {hasWeatherAlerts && (
        <div className="weather__alert">
          <div className="weather__icon-wrapper">
            <FiAlertTriangle
              className="weather__alert-icon"
              onClick={() => modalRef.current.toggleOverlayHandler()}
            />
            <p>Weather Alert</p>
          </div>
          <Modal
            ref={modalRef}
            onClick={() => modalRef.current.toggleOverlayHandler()}
          >
            {props.data.alerts.map((alert) => (
              <WeatherAlertAccordion
                title={capitalizeWordsHandler(alert.event)}
              >
                <WeatherAlert
                  headline={capitalizeWordsHandler(alert.headline)}
                  description={alert.description}
                  link={alert.link}
                  EpochOnset={alert.onsetEpoch}
                  EpochEnd={alert.endsEpoch}
                />
              </WeatherAlertAccordion>
            ))}
          </Modal>
        </div>
      )}

      {/* Error message modal */}
      {props.onError.hasError && props.onError.errorMsg && (
        <Modal
          ref={modalErrRef}
          toggleOnError={props.onError}
          onClick={() => modalErrRef.current.toggleOverlayHandler()}
        >
          <ErrorAlert errorMsg={props.onError.errorMsg} />
        </Modal>
      )}
    </LayoutMain>
  );
};

export default Weather;