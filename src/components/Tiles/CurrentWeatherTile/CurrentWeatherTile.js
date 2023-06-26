import useDate from '../../../hooks/useDate';
import IconTile from '../IconTile/IconTile';
import './CurrentWeatherTile.scss';
  
const CurrentWeatherTile = (props) => {
  // Custom hook
  const { dateFull: date } = useDate(props.datetimeEpoch);

  return (
    <section
      className={
        props.className ? `current-info ${props.className}` : "current-info"
      }
    >
      <p className="current-info__location">{props.resolvedAddress}</p>
      <article className="current-info__tile">
        <IconTile height={"12rem"} iconSrc={props.icon} />
        <p className="current-info__tile-temp">{`${props.temp}`}</p>
        <p className="current-info__tile-description">{`${props.condition}`}</p>
      </article>
      <p className="current-info__date">{date}</p>
    </section>
  );
};

export default CurrentWeatherTile;