import useDate from '../../hooks/useDate';
import StatTile from '../Tiles/StatTile/StatTile';
import './HourlyCard.scss'; 

const HourlyCard = (props) => {

  const formattedTimeString = props.datetime.slice(0, 5);

  const statTiles = [
    { title: "Hour", value: props.datetimeEpoch},
    { title: "Conditions", value: props.conditions },
    { title: "Rain", value: props.rain},
    { title: "Temp", value: props.temp},
    { title: "Feels like", value: props.feelslike},
    { title: "Humidity", value: props.humidity},
    { title: "Cloud cover", value: props.cloudcover},
    { title: "Wind", value: props.wind},
    { title: "Direction", value: props.direction},
    { title: "Visibility", value: props.visibility},
  ];

  return (
    <li className="hourly-card">
      <div className="hourly-card__wrapper">
        <div className="hourly-card__header">
          <p className="hourly-card__header-time">{formattedTimeString}</p>
          <p className="hourly-card__header-description">{props.condition}</p>
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