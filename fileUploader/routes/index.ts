import { Router } from "express";
import { rootPath, uploadMultipleFile, uploadSingleFile } from "../controller/fileUploadController";
import { upload } from "../utils/multer";

const router = Router();

router.get("/", rootPath);
router.post("/upload", upload.single('file'), uploadSingleFile )
router.post("/multi-upload", upload.array('files', 10), uploadMultipleFile )

export default router;
