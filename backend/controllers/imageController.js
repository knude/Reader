import { Router } from "express";
import multer from "multer";
import errorHandlerMiddleware from "../utils/errorHandlerMiddleware.js";

import { uploadFile, deleteFile, getFile } from "../utils/files.js";
import Series from "../models/Series.js";
import Chapter from "../models/Chapter.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/:series/:chapter/:page", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const series = await Series.find({});
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
  } catch (error) {
    next(error);
  }
});

router.get("/:series", async (req, res, next) => {
  try {
    const series = req.params.series;
    const seriesObj = await Series.findOne({ abbreviation: series }).populate(
      "chapters"
    );

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

      seriesObj.image = `data:image/png;base64,${base64Image}`;
    }

    if (!seriesObj) {
      res.sendStatus(404);
      return;
    }

    return res.json(seriesObj);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/series/:seriesId/chapters/:chapter",
  upload.array("files"),
  async (req, res, next) => {
    try {
      const { seriesId, chapter } = req.params;
      const { title } = req.body;
      const files = req.files;
      const filePath = `${seriesId}/${chapter}`;

      let seriesObj = await Series.findOne({ abbreviation: seriesId });
      if (!seriesObj) {
        res.status(500).json({ error: "Series not found." });
        return;
      }

      const uploadFiles = await uploadFile(files, filePath);
      if (!uploadFiles) {
        res.status(500).json({ error: "File upload failed." });
        return;
      }

      let chapterObj = await Chapter.findOne({
        seriesId: seriesObj._id,
        number: chapter,
      });
      if (chapterObj) {
        res.status(409).json({ error: "Chapter already exists." });
        return;
      }

      const addedImages = files.map((file) => ({ name: file.originalname }));

      chapterObj = await Chapter.create({
        seriesId: seriesObj._id,
        number: chapter,
        images: addedImages,
        title: title,
      });

      seriesObj.chapters.push(chapterObj);
      seriesObj.lastUpdated = new Date();

      await seriesObj.save();

      res.status(201).json(chapterObj);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/series/:seriesId",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { seriesId } = req.params;
      const { name, description, tags } = req.body;
      const image = req.file;
      console.log(image);

      let seriesObj = await Series.findOne({ abbreviation: seriesId });

      if (seriesObj) {
        res.status(409).json({ error: "Series already exists." });
        return;
      }

      const filePath = `${seriesId}`;
      const uploadFiles = await uploadFile([image], filePath);

      if (!uploadFiles) {
        res.status(500).json({ error: "File upload failed." });
        return;
      }

      seriesObj = await Series.create({
        name,
        description,
        abbreviation: seriesId,
        image: image.originalname,
        tags,
      });
      res.status(201).json(seriesObj);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/series/:seriesId",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { seriesId } = req.params;
      const { name, description, tags, chapters } = req.body;
      const image = req.file;

      let seriesObj = await Series.findOne({ abbreviation: seriesId });

      if (!seriesObj) {
        res.status(404).json({ error: "Series not found." });
        return;
      }

      if (image) {
        const filePath = `${seriesId}/${seriesObj.image.originalname}`;
        await deleteFile(filePath);
        await uploadFile([image], seriesId);
      }

      seriesObj.name = name || seriesObj.name;
      seriesObj.tags = tags || seriesObj.tags;
      seriesObj.image = image ? image.originalname : seriesObj.image;
      seriesObj.description = description || seriesObj.description;
      seriesObj.chapters = chapters || seriesObj.chapters;

      await seriesObj.save();
      res.status(201).json(seriesObj);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:filePath", async (req, res, next) => {
  try {
    const filePath = req.params.filePath;
    await deleteFile(filePath);
    res.status(204);
  } catch (error) {
    next(error);
  }
});

router.delete("/series/:seriesId/chapters/:chapter", async (req, res) => {
  try {
    const { seriesId, chapter } = req.params;
    const seriesObj = await Series.findOne({ abbreviation: seriesId });

    if (!seriesObj) {
      res.status(404).json({ error: "Series not found." });
      return;
    }

    const chapterObj = await Chapter.findOneAndDelete({
      seriesId: seriesObj._id,
      number: chapter,
    });

    if (!chapterObj) {
      res.status(404).json({ error: "Chapter not found." });
      return;
    }

    seriesObj.chapters.pull(chapterObj._id);
    await seriesObj.save();

    res.status(204).json({ message: "Chapter deleted." });
  } catch (error) {
    next(error);
  }
});

router.use(errorHandlerMiddleware);

export default router;
