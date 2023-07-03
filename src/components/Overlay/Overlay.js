import { AiOutlineClose } from 'react-icons/ai'
import './Overlay.scss'; 

const Overlay = (props) => {
  const isToggled = props.isToggled
  return (
    <section className={isToggled ? "overlay" : "overlay overlay--hidden"}>
      <div className='overlay__toggle'>
        <button className="overlay__toggle-btn" onClick={props.onClick}><AiOutlineClose /></button>
      </div>
      <div className='overlay__content'>
        {props.children}
      </div>
    </section>
  );
};

export default Overlay;