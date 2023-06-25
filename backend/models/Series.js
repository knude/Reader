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
    unique: true,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;
