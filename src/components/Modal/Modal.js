import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import './Modal.scss'; 

// ForwardsRef allows us to tell react when calling useRef(in parent), ref should point to this child component
const Modal = forwardRef((props, ref) => {
  const [isToggled, setIsToggled] = useState(false);
  const toggleOnError = props.toggleOnError || null;

  const toggleOverlayHandler = () => {
    setIsToggled(!isToggled);
  };

  // Allows parent component to access functions or methods defined in this component. (expose this function to be used in the parent)
  useImperativeHandle(ref, () => {
    return {
      toggleOverlayHandler: () => {
        toggleOverlayHandler();
      },
    };
  });

  // Block scroll when overlay is open
  useEffect(() => {
    if (isToggled) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, [isToggled]);

  // Toggle Modal on error
  useEffect(() => {
    if (toggleOnError) toggleOverlayHandler();
  }, [toggleOnError]);

  return ReactDOM.createPortal(
    <section className={isToggled ? "modal" : "modal modal--hidden"}>
      <div className="modal__toggle">
        <button className="modal__toggle-btn" onClick={props.onClick}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="modal__content">{props.children}</div>
    </section>,
    document.getElementById("modal-root")
  );
});

export default Modal;