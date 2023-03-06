import { Router } from "express";
import { uploadFile, deleteFile } from "./index.js";

const router = Router();

router.post("/:filePath", async (req, res) => {
  const file = req.file;
  const filePath = req.params.filePath;

  await uploadFile(file, filePath);

  res.status(200).json({
    message: "File uploaded successfully",
  });
});

router.delete("/:filePath", async (req, res) => {
  const filePath = req.params.filePath;

  await deleteFile(filePath);

  res.status(200).json({
    message: "File deleted successfully",
  });
});

export default router;
