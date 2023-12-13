/*eslint no-unused-vars: "warn"*/
import styles from './Button.module.css';
/* eslint-disable-next-line */
function Button({ children, onClick, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
