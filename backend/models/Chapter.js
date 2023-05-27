import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  seriesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Series",
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  images: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;
