/*eslint no-unused-vars: "warn"*/
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
// eslint-disable-next-line
function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  /* eslint-disable-next-line */
  if (!cities.length)
    return (
      /* eslint-disable-next-line */
      /*eslint no-unused-vars: "warn"*/
      <Message message="Add your first city by clicking a city on the map" />
    );

  /* eslint-disable-next-line */
  const countries = cities.reduce((arr, city) => {
    /* eslint-disable-next-line */
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {/* eslint-disable-next-line */}
      {countries.map((country, i) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
