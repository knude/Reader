import { Router } from "express";
import errorHandlerMiddleware from "../utils/errorHandlerMiddleware.js";
import { getFile } from "../utils/files.js";

const router = Router();

router.get("/*", async (req, res) => {
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

router.use(errorHandlerMiddleware);

export default router;
