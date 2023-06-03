import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
  },
  chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;
