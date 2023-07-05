import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import errorHandlerMiddleware from "../utils/errorHandlerMiddleware.js";
import { uploadFile, deleteFile } from "../utils/files.js";
import authMiddleware from "../utils/authMiddleware.js";
import Series from "../models/Series.js";
import Chapter from "../models/Chapter.js";

import User from "../models/User.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get(
  "/series/:seriesId/chapters/:chapter/pages/:page",
  async (req, res) => {
    const { seriesId, chapter, page } = req.params;
    const chapterNumber = chapter.split("-").pop();

    const seriesObj = await Series.findOne({ abbreviation: seriesId });
    if (!seriesObj) {
      res.status(404).json({ error: "Series not found." });
      return;
    }

    const chapterObj = await Chapter.findOne({
      seriesId: seriesObj._id,
      number: chapterNumber,
    });
    if (!chapterObj) {
      res.status(404).json({ error: "Chapter not found." });
      return;
    }

    const image = chapterObj.images[page - 1];
    if (!image) {
      res.status(404).json({ error: "Page not found." });
      return;
    }
    const imageUrl = `/images/${seriesId}/${chapter}/${image.name}`;

    res.json(imageUrl);
  }
);

router.get("/series", async (req, res) => {
  console.log("GET SERIES LIST");
  const series = await Series.find({});
  console.log(series.length + " series found.");
  const imageSeries = series.map((seriesObj) => ({
    ...seriesObj.toJSON(),
    image: `/images/${seriesObj.abbreviation}/${seriesObj.image}`,
  }));

  res.json(imageSeries);
});

router.get("/series/:seriesId", async (req, res) => {
  const { seriesId } = req.params;
  const seriesObj = await Series.findOne({ abbreviation: seriesId }).populate(
    "chapters"
  );

  if (!seriesObj) {
    res.status(404).json({ error: "Series not found." });
    return;
  }
  seriesObj.image = `/images/${seriesObj.abbreviation}/${seriesObj.image}`;

  return res.json(seriesObj);
});

router.post(
  "/series/:seriesId/chapters/:chapter",
  authMiddleware,
  upload.array("files"),
  async (req, res) => {
    const { seriesId, chapter } = req.params;
    const { title } = req.body;
    const userId = req.userId;
    const files = req.files;
    const filePath = `${seriesId}/${chapter}`;

    console.log(
      "POST CHAPTER",
      seriesId,
      chapter,
      title,
      userId,
      `${files.length} files`
    );

    const seriesObj = await Series.findOne({ abbreviation: seriesId });
    if (!seriesObj) {
      return res.status(404).json({ error: "Series not found." });
    }

    if (userId !== seriesObj.user.toString() && !req.isAdmin) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const chapterObj = await Chapter.findOne({
      seriesId: seriesObj._id,
      number: chapter,
    });
    if (chapterObj) {
      return res.status(409).json({ error: "Chapter already exists." });
    }

    const addedImages = [];
    const uploadedFiles = [];

    files.map((file) => {
      const uniqueName = `${uuidv4()}.${file.originalname.split(".").pop()}`;
      addedImages.push({ name: uniqueName });

      uploadedFiles.push({
        ...file,
        originalname: uniqueName,
      });
    });

    const createdChapter = await Chapter.create({
      seriesId: seriesObj._id,
      number: chapter,
      images: addedImages,
      title: title,
    });

    console.log(`Uploading ${uploadedFiles.length} files to ${filePath}.`);
    const uploadFiles = await uploadFile(uploadedFiles, filePath);

    if (!uploadFiles) {
      console.log("File upload failed.");
      Chapter.deleteOne({ _id: createdChapter._id });
      res.status(500).json({ error: "File upload failed." });
      return;
    }
    console.log("File upload succesful.");

    seriesObj.chapters.push(createdChapter);
    seriesObj.lastUpdated = new Date();

    await seriesObj.save();

    return res.status(201).json(createdChapter);
  }
);

router.post(
  "/series/:seriesId",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { seriesId } = req.params;
    const { name, description, tags } = req.body;
    const userId = req.userId;
    const image = req.file;

    if (!userId) {
      res.status(401).json({ error: "Invalid token." });
      return;
    }

    let seriesObj = await Series.findOne({ abbreviation: seriesId });

    if (seriesObj) {
      res.status(409).json({ error: "Series already exists." });
      return;
    }

    seriesObj = await Series.create({
      name,
      description,
      abbreviation: seriesId,
      image: image.originalname,
      tags,
      user: userId,
    });

    const filePath = `${seriesId}`;
    const uploadFiles = await uploadFile([image], filePath);

    if (!uploadFiles) {
      Series.deleteOne({ _id: seriesObj._id });
      res.status(500).json({ error: "File upload failed." });
      return;
    }

    const user = await User.findOne({ _id: userId });
    user.series.push(seriesObj._id);
    await user.save();

    res.status(201).json(seriesObj);
  }
);

router.put(
  "/series/:seriesId",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { seriesId } = req.params;
    const { name, description, tags, chapters } = req.body;
    const userId = req.userId;
    const image = req.file;

    let seriesObj = await Series.findOne({ abbreviation: seriesId }).populate(
      "chapters"
    );

    if (!seriesObj) {
      res.status(404).json({ error: "Series not found." });
      return;
    }

    if (userId !== seriesObj.user.toString() && !req.isAdmin) {
      res.status(401).json({ error: "Unauthorized." });
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
  }
);

/* router.delete("/:filePath", async (req, res) => {
  const filePath = req.params.filePath;
  await deleteFile(filePath);
  res.status(204);
}); */

router.delete("/series/:seriesId", authMiddleware, async (req, res) => {
  const { seriesId } = req.params;
  const userId = req.userId;
  const seriesObj = await Series.findOne({ abbreviation: seriesId });

  if (!seriesObj) {
    res.status(404).json({ error: "Series not found." });
    return;
  }

  if (userId !== seriesObj.user.toString() && !req.isAdmin) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  await Series.deleteOne({ _id: seriesObj._id });

  const imagePath = `${seriesObj.abbreviation}/${seriesObj.image}`;
  await deleteFile(imagePath);

  const chapters = await Chapter.find({ seriesId: seriesObj._id });

  for (const chapter of chapters) {
    for (const image of chapter.images) {
      const filePath = `${seriesObj.abbreviation}/${chapter.number}/${image.name}`;
      await deleteFile(filePath);
    }
  }

  await Chapter.deleteMany({ seriesId: seriesObj._id });

  res.status(204).json(seriesObj);
});

router.delete(
  "/series/:seriesId/chapters/:chapter",
  authMiddleware,
  async (req, res) => {
    const { seriesId, chapter } = req.params;
    const userId = req.userId;
    const seriesObj = await Series.findOne({ abbreviation: seriesId });

    if (!seriesObj) {
      res.status(404).json({ error: "Series not found." });
      return;
    }

    if (userId !== seriesObj.user.toString() && !req.isAdmin) {
      res.status(401).json({ error: "Unauthorized." });
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

    for (const image of chapterObj.images) {
      const filePath = `${seriesObj.abbreviation}/${chapterObj.number}/${image.name}`;
      await deleteFile(filePath);
    }

    seriesObj.chapters.pull(chapterObj._id);
    await seriesObj.save();

    res.status(204).json({ message: "Chapter deleted." });
  }
);

router.use(errorHandlerMiddleware);

export default router;
