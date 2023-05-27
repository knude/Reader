import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;
