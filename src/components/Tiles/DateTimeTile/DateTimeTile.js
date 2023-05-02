import "./DateTimeTile.scss";

const DateTimeTile = () => {
  const dateObj = new Date();

  const weekday = dateObj.toLocaleString("default", { weekday: "long" });
  const date = dateObj.getDate().toLocaleString();
  const month = dateObj.toLocaleString("default", { month: "long" });

  const time = dateObj.toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="dateTime">
      <div className="dateTime__date">
        <p>{`${weekday} ${date} ${month}`}</p>
      </div>
      <div className="dateTime__time">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default DateTimeTile;
