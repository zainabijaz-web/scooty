import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rangeKm: { type: Number, required: true },
  image: { type: String },
});

export default mongoose.models.ScootyModel ||
  mongoose.model("ScootyModel", modelSchema);
