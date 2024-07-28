import { Router } from "express";
import { rootPath } from "../controller/fileUploadController";

const router = Router();

router.get("/", rootPath);

export default router;
