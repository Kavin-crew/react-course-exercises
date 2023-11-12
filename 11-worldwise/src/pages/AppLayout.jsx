import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import { useAuth } from "../contexts/FakeAuthContext";
/* eslint-disable-next-line */
function AppLayout() {
  const { user } = useAuth();
  return (
    <div className={styles.app}>
      <Sidebar />
      {user && <User />}
      <Map />
    </div>
  );
}

export default AppLayout;
