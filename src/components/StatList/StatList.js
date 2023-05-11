import StatTile from '../Tiles/StatTile/StatTile';
import './StatList.scss'; 

const StatList = (props) => {
  
  const degreeSymbol = "\u00B0";
  const weatherStats = {
    "Temp": `${props.temp} ${degreeSymbol}C`,
    "Min Temp": `${props.tempmin} ${degreeSymbol}C`,
    "Feels Like": `${props.feelslike} ${degreeSymbol}C`,
    "Cloud Cover": `${props.cloudcover} %`,
    "Humidity": `${props.humidity} %`,
    "Dew": `${props.dew} ${degreeSymbol}C`,
    "UV Index": props.uvindex,
    "Visibility": `${props.visibility} %`,
    "Wind": `${props.windspeed} Kph`,
    "Direction": `${props.winddir} Deg`,
    "Sunrise": props.sunrise,
    "Sunrset": props.sunset,
    "Chance Of Rain": `${props.precipprob} %`,
    "Snow": `${props.snow} %`,
    "Snowdepth": `${props.snowdepth} CM`,
    "Moonphase": props.moonphase,
    // add id
  };

  // Concise
  // This function will return an array of jsx elements
  const renderStatItems = (classname) => {
    return Object.entries(weatherStats)
      // Filter null values
      .filter(([key, value]) => !(key === "Snow" && value === "0 %") && !(key === "Snowdepth" && value === "0 Cm"))
      // Map through filtered values
      .map(([key, value]) => (
        <li className={ classname ? `stat__item ${classname}` : 'stat__item'}>
          <p className="stat__item-label">{key}</p>
          <p className="stat__item-value">{value}</p>
        </li>
      ));
  };

  // Implicit
  const weatherStatEntries = Object.entries(weatherStats);

  const columnContent1 = weatherStatEntries.slice(0, 6).map(([key, value], index) => {
    return <StatTile key={index} title={key} value={value} />;
  });

  const columnContent2 = weatherStatEntries.slice(6, 12).map(([key, value], index) => {
    return <StatTile key={index} title={key} value={value} />;
  });

  const footerContent = weatherStatEntries.slice(12).map(([key, value], index) => {
    // Conditionally show Snow stats 
    if ((key === "Snow" && value === "0 %") || (key === "Snowdepth" && value === "0 CM")) {
      return null;
    }
    return <StatTile key={index} class={"stat-tile--center"} title={key} value={value} />;
  });

  return (
    <section className={props.class ? `stat ${props.class}` : "stat"}>
      <div className="stat__main">
        <ul className="stat__list">{columnContent1}</ul>
        <ul className="stat__list">{columnContent2}</ul>
      </div>
      <div className="stat__footer">{footerContent}</div>
    </section>
  );
};

export default StatList;