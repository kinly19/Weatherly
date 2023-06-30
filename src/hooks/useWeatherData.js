import { useState, useEffect } from 'react';
import fallBackImg from '../assets/Img/Landing.jpg';

const useWeatherData = (locationQuery) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    errorMsg: null,
  });

  // API keys
  const {REACT_APP_VISUAL_CROSSING_KEY} = process.env;
  const {REACT_APP_UNSPLASH_KEY} = process.env;
  // Urls
  const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/?location=${locationQuery}&key=${REACT_APP_VISUAL_CROSSING_KEY}&contentType=json&unitGroup=metric`;
  const unsplashUrl = `https://api.unsplash.com/search/photos/?query=${locationQuery}&orientation=landscape&client_id=${REACT_APP_UNSPLASH_KEY}`
  // Symbols
  const degreeSymbol = "\u00B0";

  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;
    // Convert moonphase values
    const getMoonPhase = (value) => {
      if (value === 0) return "New Moon";
      else if (value > 0 && value < 0.25) return "Waxing Crescent";
      else if (value === 0.25) return "First Quarter";
      else if (value > 0.25 && value < 0.5) return "Waxing Gibbous";
      else if (value === 0.5) return "Full Moon";
      else if (value > 0.5 && value < 0.75) return "Waning Gibbous";
      else if (value === 0.75) return "Last Quarter";
      else if (value > 0.75 && value < 1) return "Waning Crescent";
      else return "N/A";
    };

    // Fetch json
    const fetchJsonHandler = async (url) => {
      try {
        const res = await fetch(url, {signal});
        const data = await res.json();
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    };

    // Store data
    const storeDataHandler = async (url1, url2) => {
      try {
        setLoading(true);
        // Fetch both apis
        const [weatherData, imageData] = await Promise.allSettled([fetchJsonHandler(url1), fetchJsonHandler(url2)]);
        
        if (weatherData.status === "fulfilled") {
          const { currentConditions } = weatherData.value;
          // Background image array list
          const backgroundImgUrls = imageData.value.results.map(
            (urlItems) => urlItems.urls.full
          );

          // Store Data/Rebuild object
          setData({
            backgroundUrls: backgroundImgUrls.length > 0 ? backgroundImgUrls : [fallBackImg],
            resolvedAddress: weatherData.value.resolvedAddress,
            description: weatherData.value.description,
            alerts: weatherData.value.alerts,
            currentConditions: {
              temp: `${currentConditions.temp} ${degreeSymbol}C`,
              mintemp: `${weatherData.value.days[0].tempmin} ${degreeSymbol}C`,
              feelslike: `${currentConditions.feelslike} ${degreeSymbol}C`,
              cloudcover: `${currentConditions.cloudcover} %`,
              humidity: `${currentConditions.humidity} %`,
              dew: `${currentConditions.dew} ${degreeSymbol}C`,
              uvindex: currentConditions.uvindex,
              visibility: `${currentConditions.visibility} Km`,
              wind: `${currentConditions.windspeed} Kph`,
              direction: `${currentConditions.winddir} Deg`,
              sunrise: currentConditions.sunrise,
              sunset: currentConditions.sunset,
              rain: `${currentConditions.precipprob} %`,
              snow: `${currentConditions.snow} %`,
              snowdepth: `${currentConditions.snowdepth} CM`,
              moonphase: getMoonPhase(currentConditions.moonphase),
              icon: currentConditions.icon,
              condition: currentConditions.conditions,
              datetimeEpoch: currentConditions.datetimeEpoch,
            },
            days: weatherData.value.days.map((days) => {
              return {
                temp: `${days.temp} ${degreeSymbol}C`,
                mintemp: `${days.tempmin} ${degreeSymbol}C`,
                maxtemp: `${days.tempmax} ${degreeSymbol}C`,
                feelslike:`${days.feelslike} ${degreeSymbol}C`,
                cloudcover: `${days.cloudcover} %`,
                humidity: `${days.humidity} %`,
                dew: `${days.dew} ${degreeSymbol}C`,
                uvindex: days.uvindex,
                visibility: `${days.visibility} %`,
                wind: `${days.windspeed} Kph`,
                direction: `${days.winddir} Deg`,
                sunrise: days.sunrise,
                sunset: days.sunset,
                rain: `${days.precipprob} %`,
                snow: `${days.snow} %`,
                snowdepth: `${days.snowdepth} CM`,
                moonphase: getMoonPhase(days.moonphase),
                icon: days.icon,
                condition: days.conditions,
                datetimeEpoch: days.datetimeEpoch,
                hours: days.hours.map((hourlyData) => {
                  return {
                    rain: `${hourlyData.precipprob} %`,
                    temp: `${hourlyData.temp} ${degreeSymbol}C`,
                    feelslike: `${hourlyData.feelslike} ${degreeSymbol}C`,
                    humidity: `${hourlyData.humidity} %`,
                    cloudcover: `${hourlyData.cloudcover} %`,
                    wind: `${hourlyData.windspeed} Kph`,
                    direction: `${hourlyData.winddir} Deg`,
                    visibility: `${hourlyData.visibility} Km`,
                    icon: hourlyData.icon,
                    condition: hourlyData.conditions,
                    datetimeEpoch: hourlyData.datetimeEpoch,
                    datetime: hourlyData.datetime,
                  };
                }),
              };
            }),
          });
        } else {
          throw new Error("Location not found please try again...");
        }
               
      } catch (err) {
        setError({
          hasError: true,
          errorMsg: err.message,
        });
      } finally {
        // Reset loading state
        setLoading(false);
      }
    };

    // Only fetch when locationQuery changes
    if (locationQuery) {
      console.log(locationQuery);
      storeDataHandler(weatherUrl, unsplashUrl);
    } else {
      return;
    }

    // Clean up
    return () => {
      controller.abort();
    }

  }, [locationQuery])
  
  return {data, loading, error};
}

export default useWeatherData;