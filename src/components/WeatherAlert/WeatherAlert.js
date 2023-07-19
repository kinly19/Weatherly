import useDate from '../../hooks/useDate';
import './WeatherAlert.scss';

const WeatherAlert = (props) => {

  const { dateFull: dateEpoch, time: timeEpoch } = useDate(props.EpochOnset);
  const { dateFull: dateEndEpoch, time: timeEndEpoch } = useDate(props.EpochEnd);
  
  return (
    <div className="alert">
      <div className="alert__content">
        <h2>{props.headline}</h2>
        <p>{props.description}</p>
        <a href={props.link}>Read more</a>
        <p>Start: {`${dateEpoch} - ${timeEpoch}`}</p>
        <p>End: {`${dateEndEpoch} - ${timeEndEpoch}`}</p>
      </div>
    </div>
  );
};

export default WeatherAlert;