import { Router } from "express";
import multer from "multer";

import { uploadFile, deleteFile } from "../utils/files.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.any(), async (req, res) => {
  const { series, chapter } = req.body;
  const file = req.files[0];
  const filePath = `${series}/${chapter}/${file.originalname}`;

  const uploadedFile = await uploadFile(file, filePath);

  res.status(201).json(uploadedFile);
});

router.delete("/:filePath", async (req, res) => {
  const filePath = req.params.filePath;

  await deleteFile(filePath);

  res.status(204);
});

export default router;
