import useDate from "../../../hooks/useDate";
import "./DateTimeTile.scss";

const DateTimeTile = () => {
  const { dateFull, time } = useDate();

  return (
    <div className="dateTime">
      <div className="dateTime__date">
        <p>{dateFull}</p>
      </div>
      <div className="dateTime__time">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default DateTimeTile;
