import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
