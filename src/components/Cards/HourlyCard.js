import useDate from '../../hooks/useDate';
import StatTile from '../Tiles/StatTile/StatTile';
import './HourlyCard.scss'; 

const HourlyCard = (props) => {

  const { time } = useDate(props.datetimeEpoch);

  const statTiles = [
    { title: "Hour", value: props.datetimeEpoch},
    { title: "Conditions", value: props.conditions},
    { title: "Rain", value: props.precipprob },
    { title: "Temp", value: props.temp },
    { title: "Feels like", value: props.feelslike },
    { title: "Humidity", value: props.humidity },
    { title: "Cloud cover", value: props.cloudcover },
    { title: "Wind", value: props.windspeed },
    { title: "Direction", value: props.winddir },
    { title: "Visibility", value: props.visibility },
  ];

  return (
    <li className="hourly-card">
      <div className="hourly-card__wrapper">
        <div className="hourly-card__header">
          <p className="hourly-card__header-time">{time}</p>
          <p className="hourly-card__header-description">{statTiles[1].value}</p>
        </div>

        <ul className="hourly-card__list">
          {statTiles.slice(2).map((tile, index) => {
            return (
              <StatTile
                key={index}
                className={"stat-tile--pd-sm"}
                title={tile.title}
                value={tile.value}
              />
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default HourlyCard;