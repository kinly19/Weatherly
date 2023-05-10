import './LayoutMain.scss'; 

const LayoutMain = (props) => {
  const background = {
    backgroundImage: `url(${props.backgroundImage})`,
  };

  return (
    <div className="layout__background" style={background}>
      <main className={props.class ? `layout__container ${props.class}` : 'layout__container'}>
        {props.children}
      </main>
    </div>
  );
};

export default LayoutMain;