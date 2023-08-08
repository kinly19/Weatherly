import './LoadingSpinner.scss';

const LoadingSpinner = (props) => {
  return (
    <div className='loading' style={{alignItems : `${props.align}`}}>
      <p>Loading Please Wait...</p>
      <div className='loading__spanContainer'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;