import useDate from '../../../hooks/useDate';
import IconTile from '../IconTile/IconTile';
// import {Clear, ClearNight} from '../../../assets/Svg/Svg.js';
import './CurrentWeatherTile.scss';
  
const CurrentWeatherTile = (props) => {
  // Custom hook
  const { dateFull: date } = useDate(props.datetimeEpoch);

  return (
    <section className={props.className ? `current-info ${props.className}` : 'current-info'}>
      <p className="current-info__location">{props.resolvedAddress}</p>
      <article className="current-info__tile">
        <IconTile 
          iconSrc={props.icon} 
          height={"12rem"} 
        />
        <p className="current-info__tile-temp">{`${props.temp} C`}</p>
        <p className="current-info__tile-description">{`${props.conditions}`}</p>
      </article>
      <p className="current-info__date">{date}</p>
    </section>
  );
};

export default CurrentWeatherTile;