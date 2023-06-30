const useDate = (timeStamp) => {
  // If no Unix timestamp is provided, use current date and time
  const date = new Date(timeStamp * 1000 || new Date());

  const fullDateOptions = {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  };

  const shortDateOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  }

  const dateFull = date.toLocaleDateString("default", fullDateOptions).replace(',','');
  const dateShort = date.toLocaleDateString('default', shortDateOptions).replace(',', '');
  const time = date.toLocaleTimeString('default', timeOptions);

  return { date, dateFull, dateShort, time};
};

export default useDate;