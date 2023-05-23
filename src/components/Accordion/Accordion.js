import { useState } from 'react';
import useDate from '../../hooks/useDate';
import IconTile from '../Tiles/IconTile/IconTile';
import { FiChevronDown } from 'react-icons/fi';
import './Accordion.scss';

const Accordion = (props) => {
  const [toggle, setToggle] = useState(false);
  const { dateShort: date } = useDate(props.datetimeEpoch);
  const degreeSymbol = "\u00B0";

  const toggleAccordionHandler = () => {
    console.log("Toggle accordion")
    setToggle(!toggle);
  }

  return (
    <div className="accordion">
      <div className="accordion__header" onClick={toggleAccordionHandler}>
        <div className="accordion__title">
          <p className="accordion__title-main">{date}</p>
          <p className="accordion__title-sub">{props.condition}</p>
        </div>

        <div className="accordion__header-tiles">
          <div className="accordion__tile">
            <p className="accordion__tile-label">Temp</p>
            <p className="accordion__tile-value">{`${props.temp} ${degreeSymbol}C`}</p>
          </div>

          <div className="accordion__tile">
            <p className="accordion__tile-label">Rain</p>
            <p className="accordion__tile-value">{`${props.rain} %`}</p>
          </div>

          <div className="accordion__tile">
            <IconTile height={"5rem"} iconSrc={props.icon} />
          </div>
        </div>

        <div
          className={toggle ? "accordion__toggle rotate" : "accordion__toggle"}
        >
          <FiChevronDown />
        </div>
      </div>

      <div className={toggle ? "accordion__content expand" : "accordion__content"}>
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;