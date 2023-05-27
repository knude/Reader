import { Router } from "express";
import multer from "multer";

import { uploadFile, deleteFile, getFile } from "../utils/files.js";
import Series from "../models/Series.js";
import Chapter from "../models/Chapter.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array("files"), async (req, res) => {
  const { series, chapter } = req.body;
  const files = req.files;
  const filePath = `${series}/${chapter}`;

  const uploadFiles = await uploadFile(files, filePath);

  if (!uploadFiles) {
    res.status(500).json({ error: "File upload failed." });
  } else {
    let seriesObj = await Series.findOne({ name: series });
    if (!seriesObj) {
      seriesObj = await Series.create({ name: series });
    }

    let chapterObj = await Chapter.findOne({
      seriesId: seriesObj._id,
      number: chapter,
    });

    if (!chapterObj) {
      chapterObj = await Chapter.create({
        seriesId: seriesObj._id,
        number: chapter,
        images: files.map((file) => ({ name: file.originalname })),
      });

      res.status(201).json(chapterObj);
    } else {
      const images = files.map((file) => ({ name: file.originalname }));
      chapterObj.images = [...chapterObj.images, ...images];
      await chapterObj.save();

      res.status(200).json(chapterObj);
    }
  }
});

router.get("/:series/:chapter/:page", async (req, res) => {
  const { series, chapter, page } = req.params;

  const chapterNumber = chapter.split("-").pop();

  const seriesObj = await Series.findOne({ name: series });
  const chapterObj = await Chapter.findOne({
    seriesId: seriesObj._id,
    number: chapterNumber,
  });

  const imageName = chapterObj.images[page - 1].name;
  const filePath = `${series}/${chapterNumber}/${imageName}`;

  const dataStream = await getFile(filePath);

  if (!dataStream) {
    res.sendStatus(404);
  } else {
    dataStream.on("data", (data) => res.write(data));
    dataStream.on("end", () => res.end());
    dataStream.on("error", () => res.sendStatus(500));
  }
});

router.delete("/:filePath", async (req, res) => {
  const filePath = req.params.filePath;
  console.log(filePath);

  await deleteFile(filePath);

  res.status(204);
});

export default router;
