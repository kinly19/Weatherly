import { useEffect, useRef } from 'react';
import './LayoutMain.scss'; 

const LayoutMain = (props) => {
  const background = {
    backgroundImage: `url(${props.backgroundImage})`,
  };

  const layoutRef = useRef();

  useEffect(() => {
    layoutRef.current.scrollIntoView({behavior: "smooth"});
  },[])

  return (
    <div className="layout__background" style={background} ref={layoutRef}>
      <main className={props.className ? `layout__container ${props.className}` : 'layout__container'}>
        {props.children}
      </main>
    </div>
  );
};

export default LayoutMain;