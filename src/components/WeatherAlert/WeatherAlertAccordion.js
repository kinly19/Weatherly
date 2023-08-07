import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './WeatherAlertAccordion.scss';

const WeatherAlertAccordion = (props) => {
  const [toggle, setToggle] = useState(false);
  
  const toggleAccordionHandler = () => {
   setToggle(!toggle);
  };

  return (
    <div className='alert-accord'>
      <div className='alert-accord__header' onClick={toggleAccordionHandler}>
        <p className='alert-accord__header-title'>{props.title}</p> 
        <div className={toggle ? "alert-accord__header-toggle rotate" : "alert-accord__header-toggle"}>
          <FiChevronDown />
        </div>
      </div>
      <div className={toggle ? "alert-accord__content accord-expand" : "alert-accord__content"}>
        {props.children}
      </div>
    </div>
  );
};

export default WeatherAlertAccordion;