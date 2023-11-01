import styles from "./Message.module.css";
/*eslint no-unused-vars: "warn"*/
/* eslint-disable-next-line */
function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
