import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import './Overlay.scss'; 

const Overlay = (props) => {
  const isToggled = props.isToggled;
  // Block scroll when overlay is open
  useEffect(() => {
    if (isToggled) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, [isToggled]);

  return (
    <section className={isToggled ? "overlay" : "overlay overlay--hidden"}>
      <div className="overlay__toggle">
        <button className="overlay__toggle-btn" onClick={props.onClick}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="overlay__content">{props.children}</div>
    </section>
  );
};

export default Overlay;