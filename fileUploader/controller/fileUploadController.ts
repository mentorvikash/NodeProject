import { Request, Response } from "express";

const rootPath = async (req: Request, res: Response) => {
    res.status(200).send("welcome to file uploader");
  }


export {rootPath}