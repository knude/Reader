import { Router } from "express";
import multer from "multer";

import { uploadFile, deleteFile, getFile } from "../utils/files.js";
import Series from "../models/Series.js";
import Chapter from "../models/Chapter.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/:series/:chapter/:page", async (req, res) => {
  const { series, chapter, page } = req.params;
  const chapterNumber = chapter.split("-").pop();

  const seriesObj = await Series.findOne({ abbreviation: series });
  if (!seriesObj) {
    res.sendStatus(404);
    return;
  }

  const chapterObj = await Chapter.findOne({
    seriesId: seriesObj._id,
    number: chapterNumber,
  });
  if (!chapterObj) {
    res.sendStatus(404);
    return;
  }

  const image = chapterObj.images[page - 1];
  if (!image) {
    res.sendStatus(404);
    return;
  }

  const imageName = image.name;
  const filePath = `${series}/${chapterNumber}/${imageName}`;

  const dataStream = await getFile(filePath);

  if (!dataStream) {
    res.sendStatus(404);
    return;
  }

  res.set("Content-Type", "image/png");
  dataStream.on("data", (data) => res.write(data));
  dataStream.on("end", () => res.end());
  dataStream.on("error", () => res.sendStatus(500));
});

router.get("/", async (req, res) => {
  const series = await Series.find({});

  // Go through each series and retrieve the image file
  for (let i = 0; i < series.length; i++) {
    const seriesObj = series[i];
    const filePath = `${seriesObj.abbreviation}/${seriesObj.image}`;
    const dataStream = await getFile(filePath);

    if (dataStream) {
      const imageBuffer = await new Promise((resolve, reject) => {
        const chunks = [];
        dataStream.on("data", (chunk) => chunks.push(chunk));
        dataStream.on("end", () => resolve(Buffer.concat(chunks)));
        dataStream.on("error", (error) => reject(error));
      });

      const base64Image = imageBuffer.toString("base64");

      series[i].image = `data:image/png;base64,${base64Image}`;
    }
  }

  res.json(series);
});

router.get("/:series", async (req, res) => {
  const series = req.params.series;
  const seriesObj = await Series.findOne({ abbreviation: series }).populate(
    "chapters"
  );

  if (!seriesObj) {
    res.sendStatus(404);
    return;
  }

  return res.json(seriesObj);
});
router.post("/", upload.array("files"), async (req, res) => {
  const { series, chapter } = req.body;
  const files = req.files;
  const filePath = `${series}/${chapter}`;

  const uploadFiles = await uploadFile(files, filePath);

  if (!uploadFiles) {
    res.status(500).json({ error: "File upload failed." });
    return;
  }

  let seriesObj = await Series.findOne({ abbreviation: series });
  if (!seriesObj) {
    res.status(500).json({ error: "Series not found." });
    return;
  }

  let chapterObj = await Chapter.findOne({
    seriesId: seriesObj._id,
    number: chapter,
  });

  seriesObj.lastUpdated = new Date();

  if (!chapterObj) {
    chapterObj = await Chapter.create({
      seriesId: seriesObj._id,
      number: chapter,
      images: files.map((file) => ({ name: file.originalname })),
    });

    seriesObj.chapters.push(chapterObj);
    await seriesObj.save();

    res.status(201).json(chapterObj);
  } else {
    const images = files.map((file) => ({ name: file.originalname }));
    chapterObj.images = [...chapterObj.images, ...images];
    await chapterObj.save();

    res.status(200).json(chapterObj);
  }
});

router.post("/series/:seriesId", upload.single("image"), async (req, res) => {
  const { seriesId } = req.params;
  const { name } = req.body;
  const image = req.file;

  let seriesObj = await Series.findOne({ abbreviation: seriesId });

  const filePath = `${seriesId}`;
  const uploadFiles = await uploadFile([image], filePath);

  if (!uploadFiles) {
    res.status(500).json({ error: "File upload failed." });
    return;
  }

  if (seriesObj) {
    seriesObj.name = name;
    seriesObj.abbreviation = seriesId;
    seriesObj.image = image.originalname;
    await seriesObj.save();
    res.status(201).json(seriesObj);
    return;
  }

  seriesObj = await Series.create({
    name,
    abbreviation: seriesId,
    image: image.originalname,
  });
  res.status(201).json(seriesObj);
});

router.delete("/:filePath", async (req, res) => {
  const filePath = req.params.filePath;

  await deleteFile(filePath);

  res.status(204);
});

export default router;
