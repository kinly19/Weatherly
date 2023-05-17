import './StatTile.scss';

const StatTile = (props) => {
  return (
    <li className={props.className ? `stat-tile ${props.className}` : 'stat-tile'}> {/* use mod to adjust padding for the block */}
      <p className="stat-tile__label">{props.title}:</p>
      <p className="stat-tile__value">{props.value}</p>
    </li>
  );
};

export default StatTile;