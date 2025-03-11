import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    numNights: {
      type: Int16Array,
      required: true,
    },
    numGuests: {
      type: Int16Array,
      required: true,
    },
    cabinPrice: {
      type: Int16Array,
      required: true,
    },
    extrasPrice: {
      type: Int16Array,
      required: true,
    },
    totalPrice: {
      type: Int16Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    hasBreakfast: {
      type: Boolean,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    observations: {
      type: String,
    },
    cabinId: {
      type: Schema.Types.ObjectId,
      ref: "Cabin",
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: "Guest",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
