import styles from "./CountryItem.module.css";
/* eslint-disable-next-line */
function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      {/* eslint-disable-next-line */}
      <span>{country.emoji}</span>
      {/* eslint-disable-next-line */}
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
