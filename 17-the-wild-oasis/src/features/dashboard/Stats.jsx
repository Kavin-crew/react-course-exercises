import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedstays, numDays, cabinCount }) {
  //   1. number of bookings
  const numBookings = bookings.length;

  //   2.total sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //   3. checkin days
  const checkins = confirmedstays.length;

  //   4. occupancy rate
  //  ( num checked in nights / all available nights ) / number of days * num cabins
  const occupation =
    (confirmedstays.reduce((acc, cur) => acc + cur.numNights, 0) / numDays) *
    cabinCount;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation)}%`}
      />
    </>
  );
}

export default Stats;
