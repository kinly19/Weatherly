import { useState, useEffect } from 'react';
import './IconTile.scss';

const IconTile = (props) => {
  const [iconSource, setIconSource] = useState(props.iconSrc);
  const containerHeight = { height: props.height ? props.height : null };

  // Update state when props change
  useEffect(() => {
    setIconSource(props.iconSrc);
  }, [props.iconSrc]);

  return (
    props.iconSrc && (
      <div className="icon-tile" style={containerHeight}>
        <img
          src={require(`../../../assets/Svg/${iconSource}.svg`)}
          alt="iconset"
        />
      </div>
    )
  );
};

export default IconTile;