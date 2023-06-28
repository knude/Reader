import request from "supertest";
import app from "../app.js";
import { Router } from "express";
import mongoose from "mongoose";

import User from "../models/User.js";

const router = Router();

app.use("/api/users", router);

describe("User tests", () => {
  describe("No existing users", () => {
    beforeEach(async () => {
      const users = await User.find({});
      for (const user of users) {
        await request(app).delete(`/api/users/${user.username}`);
      }
    });

    test("Create user", async () => {
      const username = "username";
      const password = "password";

      const response = await request(app)
        .post(`/api/users`)
        .send({ username, password })
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.username).toBe(username);
    });

    test("Create user with no username fails", async () => {
      const password = "password";

      const response = await request(app)
        .post(`/api/users`)
        .send({ password })
        .expect(400);

      expect(response.body).toBeDefined();
      expect(response.body.error).toBe("Username is required.");
    });
  });

  afterAll(async () => {
    const users = await User.find({});
    for (const user of users) {
      await request(app).delete(`/api/users/${user.username}`);
    }
    mongoose.connection.close();
  });
});
