import { Schema, model, models } from "mongoose";

const CabinSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    desciption: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Cabin = models.Cabin || model("Cabin", CabinSchema);

export default Cabin;
