import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  tags: [
    {
      type: String,
    },
  ],
  chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;
