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
