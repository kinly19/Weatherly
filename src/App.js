import { Fragment, useEffect, useRef } from 'react'
import useWeatherData from './hooks/useWeatherData';
import Landing from './components/Landing/Landing';
import Weather from './components/Weather/Weather';
import Footer from './components/Footer/Footer';
import './App.scss';

function App() {
  const {data, error, loading, geoPositionHandler, fetchQueryHandler} = useWeatherData();
  const isInitialRender = useRef(true);
 
  useEffect(() => {
    // Stop first useEffect render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    geoPositionHandler();
  },[]);

  // Data and functions will be passed down via props here
  return (
    <Fragment>
      {data && console.log(data)}

      {/* Landing */}
      {!data && <Landing onError={error} handleSubmit={fetchQueryHandler} loading={loading}/>}

      {/* Weather data */}
      {data && <Weather data={data} onError={error} handleSubmit={fetchQueryHandler} loading={loading}/>}
      <Footer />
    </Fragment>
  );
}

export default App;