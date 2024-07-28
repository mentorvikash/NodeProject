import { Request, Response } from "express";

const rootPath = async (req: Request, res: Response) => {
  res.status(200).send("welcome to file uploader");
};

const uploadSingleFile = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "File uploaded successfully" });
};

const uploadMultipleFile = async (req: Request, res: Response) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "no file present" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Files uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "File upload fails" });
  }
};

export { rootPath, uploadSingleFile, uploadMultipleFile };
