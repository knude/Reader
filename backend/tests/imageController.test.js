/*

import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import errorHandlerMiddleware from "../utils/errorHandlerMiddleware.js";
import { uploadFile, deleteFile, getFile } from "../utils/files.js";
import Series from "../models/Series.js";
import Chapter from "../models/Chapter.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get(
  "/series/:seriesId/chapters/:chapter/pages/:page",
  async (req, res) => {
    const { seriesId, chapter, page } = req.params;
    const chapterNumber = chapter.split("-").pop();

    const seriesObj = await Series.findOne({ abbreviation: seriesId });
    if (!seriesObj) {
      res.status(404).json({ error: "Series not found" });
      return;
    }

    const chapterObj = await Chapter.findOne({
      seriesId: seriesObj._id,
      number: chapterNumber,
    });
    if (!chapterObj) {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }

    const image = chapterObj.images[page - 1];
    if (!image) {
      res.status(404).json({ error: "Page not found" });
      return;
    }
    const imageUrl = `/images/${seriesId}/${chapter}/${image.name}`;

    res.json(imageUrl);
  }
);

router.get("/images/*", async (req, res) => {
  console.log("GET IMAGE");
  const filePath = req.params[0];
  console.log(filePath);
  const dataStream = await getFile(filePath);

  if (dataStream) {
    dataStream.pipe(res);
  } else {
    res.sendStatus(404);
  }
});

router.get("/series", async (req, res) => {
  const series = await Series.find({});
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

  seriesObj.image = `/images/${seriesObj.abbreviation}/${seriesObj.image}`;

  if (!seriesObj) {
    res.status(404).json({ error: "Series not found." });
    return;
  }

  return res.json(seriesObj);
});

router.post(
  "/series/:seriesId/chapters/:chapter",
  upload.array("files"),
  async (req, res) => {
    const { seriesId, chapter } = req.params;
    const { title } = req.body;
    const files = req.files;
    const filePath = `${seriesId}/${chapter}`;

    const seriesObj = await Series.findOne({ abbreviation: seriesId });
    if (!seriesObj) {
      return res.status(500).json({ error: "Series not found." });
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

    const createdChapter = await Chapter.create({
      seriesId: seriesObj._id,
      number: chapter,
      images: addedImages,
      title: title,
    });

    files.map((file) => {
      const uniqueName = `${uuidv4()}.${file.originalname.split(".").pop()}`;
      addedImages.push({ name: uniqueName });

      uploadedFiles.push({
        ...file,
        originalname: uniqueName,
      });
    });

    const uploadFiles = await uploadFile(uploadedFiles, filePath);

    if (!uploadFiles) {
      Chapter.deleteOne({ _id: createdChapter._id });
      res.status(500).json({ error: "File upload failed." });
      return;
    }

    seriesObj.chapters.push(createdChapter);
    seriesObj.lastUpdated = new Date();

    await seriesObj.save();

    return res.status(201).json(createdChapter);
  }
);

router.post("/series/:seriesId", upload.single("image"), async (req, res) => {
  const { seriesId } = req.params;
  const { name, description, tags } = req.body;
  const image = req.file;

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
  });

  const filePath = `${seriesId}`;
  const uploadFiles = await uploadFile([image], filePath);

  if (!uploadFiles) {
    Series.deleteOne({ _id: seriesObj._id });
    res.status(500).json({ error: "File upload failed." });
    return;
  }
  res.status(201).json(seriesObj);
});

router.put("/series/:seriesId", upload.single("image"), async (req, res) => {
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
});

router.delete("/:filePath", async (req, res) => {
  const filePath = req.params.filePath;
  await deleteFile(filePath);
  res.status(204);
});

router.delete("/series/:seriesId", async (req, res) => {
  const { seriesId } = req.params;
  const seriesObj = await Series.findOneAndDelete({ abbreviation: seriesId });
  const imagePath = `${seriesObj.abbreviation}/${seriesObj.image}`;
  await deleteFile(imagePath);

  if (!seriesObj) {
    res.status(404).json({ error: "Series not found." });
    return;
  }

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

router.delete("/series/:seriesId/chapters/:chapter", async (req, res) => {
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

  for (const image of chapterObj.images) {
    const filePath = `${seriesObj.abbreviation}/${chapterObj.number}/${image.name}`;
    await deleteFile(filePath);
  }

  seriesObj.chapters.pull(chapterObj._id);
  await seriesObj.save();

  res.status(204).json({ message: "Chapter deleted." });
});

router.use(errorHandlerMiddleware);

export default router;


*/

import request from "supertest";
import app from "../app.js";
import { Router } from "express";
import mongoose from "mongoose";
import fs from "fs";

import Series from "../models/Series.js";

const router = Router();

app.use("/api", router);

describe("imageController", () => {
  beforeEach(async () => {
    const series = await Series.find({});

    for (const seriesObj of series) {
      await request(app).delete(`/api/series/${seriesObj.abbreviation}`);
    }
  });

  describe("No existing series", () => {
    test("Create series", async () => {
      const seriesId = "series-id";
      const name = "series-name";
      const description = "series-description";
      const tags = ["tag1", "tag2"];

      const imageName = "test-image.png";
      const image = fs.readFileSync(`${__dirname}\\${imageName}`);

      const response = await request(app)
        .post(`/api/series/${seriesId}`)
        .field("name", name)
        .field("description", description)
        .field("tags", tags)
        .attach("image", image, "test-image.png")
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.name).toBe(name);
      expect(response.body.description).toBe(description);
      expect(response.body.tags).toEqual(tags);
      expect(response.body.image).toBe(imageName);
    });

    test("Get non-existent series fails", async () => {
      const seriesId = "series-id";
      const response = await request(app)
        .get(`/api/series/${seriesId}`)
        .expect(404);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Series not found.");
    });

    test("Get page from non-existent series fails", async () => {
      const seriesId = "series-id";
      const chapter = "chapter-1";
      const page = 1;

      const response = await request(app)
        .get(`/api/series/${seriesId}/chapters/${chapter}/pages/${page}`)
        .expect(404);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Series not found.");
    });

    test("Delete non-existent series fails", async () => {
      const seriesId = "series-id";
      const response = await request(app)
        .delete(`/api/series/${seriesId}`)
        .expect(404);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Series not found.");
    });

    test("Delete chapter from non-existent series", async () => {
      const seriesId = "series-id";
      const chapter = 1;
      const response = await request(app)
        .delete(`/api/series/${seriesId}/chapters/${chapter}`)
        .expect(404);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Series not found.");
    });

    test("Create chapter in non-existent series fails", async () => {
      const seriesId = "series-id";
      const chapter = 1;
      const title = "chapter-title";
      const response = await request(app)
        .post(`/api/series/${seriesId}/chapters/${chapter}`)
        .field("title", title)
        .expect(404);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Series not found.");
    });

    // pages are created with chapters, and can't be deleted individually so no need to test
  });

  describe("Existing series", () => {
    // Create existing series for testing
    beforeEach(async () => {
      const seriesId = "series-id";
      const name = "series-name";
      const description = "series-description";
      const tags = ["tag1", "tag2"];

      const imageName = "test-image.png";
      const image = fs.readFileSync(`${__dirname}\\${imageName}`);

      await request(app)
        .post(`/api/series/${seriesId}`)
        .field("name", name)
        .field("description", description)
        .field("tags", tags)
        .attach("image", image, "test-image.png");

      const chapter = 1;
      const title = "chapter-title";

      await request(app)
        .post(`/api/series/${seriesId}/chapters/${chapter}`)
        .field("title", title);
    });

    test("Get existing series", async () => {
      const seriesId = "series-id";
      const response = await request(app)
        .get(`/api/series/${seriesId}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.abbreviation).toBe(seriesId);
    });

    test("Create chapter", async () => {
      const seriesId = "series-id";
      const chapter = 2;
      const title = "chapter-title";

      const response = await request(app)
        .post(`/api/series/${seriesId}/chapters/${chapter}`)
        .field("title", title)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.number).toBe(chapter);
      expect(response.body.title).toBe(title);
    });

    test("Get non-existing page from existing chapter", async () => {
      const seriesId = "series-id";
      const chapter = 1;
      const page = 1;

      const response = await request(app)
        .get(`/api/series/${seriesId}/chapters/${chapter}/pages/${page}`)
        .expect(404);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Page not found.");
    });

    test("Delete existing chapter", async () => {
      const seriesId = "series-id";
      const chapter = 1;

      const response = await request(app)
        .delete(`/api/series/${seriesId}/chapters/${chapter}`)
        .expect(204);

      expect(response.body).toBeDefined();
    });

    test("Delete non-existing chapter", async () => {
      const seriesId = "series-id";
      const chapter = 3;

      const response = await request(app)
        .delete(`/api/series/${seriesId}/chapters/${chapter}`)
        .expect(404);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Chapter not found.");
    });

    test("Delete existing series", async () => {
      const seriesId = "series-id";

      const response = await request(app)
        .delete(`/api/series/${seriesId}`)
        .expect(204);

      expect(response.body).toBeDefined();
    });

    test("Create chapter with existing number fails", async () => {
      const seriesId = "series-id";
      const chapter = 1;
      const title = "chapter-title";

      const response = await request(app)
        .post(`/api/series/${seriesId}/chapters/${chapter}`)
        .field("title", title)
        .expect(409);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Chapter already exists.");
    });
  });

  afterAll(async () => {
    const series = await Series.find({});

    for (const seriesObj of series) {
      await request(app).delete(`/api/series/${seriesObj.abbreviation}`);
    }

    mongoose.connection.close();
  });
});
