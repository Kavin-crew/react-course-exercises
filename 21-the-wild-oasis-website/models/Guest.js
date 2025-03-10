import { Schema, model, models } from "mongoose";

const GuestSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    nationalID: {
      type: String,
      required: [true, "National Id is required"],
    },
    nationality: {
      type: String,
    },
    countryFlag: {
      type: String,
    },
  },
  { timestamps: true }
);

const Guest = models.Guest || model("Guest", GuestSchema);

export default Guest;
