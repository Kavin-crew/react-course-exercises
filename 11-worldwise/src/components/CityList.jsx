/*eslint no-unused-vars: "warn"*/
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import styles from "./CityList.module.css";
// eslint-disable-next-line
function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  /* eslint-disable-next-line */
  if (!cities.length)
    return (
      /* eslint-disable-next-line */
      /*eslint no-unused-vars: "warn"*/
      <Message message="Add your first city by clicking a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {/* eslint-disable-next-line */}
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
