import { Router } from "express";
import multer from "multer";

import { uploadFile, deleteFile, getFile } from "../utils/files.js";

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
  console.log(filePath);

  await deleteFile(filePath);

  res.status(204);
});

router.get("/:series/:chapter/:page", async (req, res) => {
  const { series, chapter, page } = req.params;
  const filePath = `${series}/${chapter}/${page}`;

  const dataStream = await getFile(filePath);

  if (!dataStream) {
    res.sendStatus(404);
  } else {
    dataStream.on("data", (data) => res.write(data));
    dataStream.on("end", () => res.end());
    dataStream.on("error", () => res.sendStatus(500));
  }
});

export default router;
