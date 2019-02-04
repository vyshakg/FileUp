import express, { Request } from "express";
import { getConnection } from "typeorm";
import upload, { storageDir } from "../uploadConfig";
import { File } from "../entity/file";

interface fileObject {
  originalname: string;
  mimetype: string;
  filename: string;
  size: string;
}
const route = express.Router();

route.post("/api/upload", upload.array("files", 4), async (req, res) => {
  const files: any = req.files;
  

  // await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(File)
  //   .values({ originalname: "NAME" })
  //   .execute();
  // const file = File.create({
  //   originalname: req.file.originalname,
  //   mimetype: req.file.mimetype,
  //   filename: req.file.filename,
  //   size: req.file.size
  // });
  // const fileRecourd = await file.save();
  console.log(req.files);
  return res.json({
    ok: true,
    file: req.file
  });
});

route.get("/api/download/:id", async (req, res) => {
  const id = req.params.id;
  const file = await File.findOne({ where: { id } });
  if (!file) {
    return res.status(400).json({ message: "No such file was Found" });
  }
  return res.download(`${storageDir}/${file!.filename}`, err => {
    if (err) {
      return res.status(404).json({ message: "No such file was Found" });
    }
  });
});

route.get("/api/allFiles", async (req, res) => {
  const files = await File.find();
  if (!files) {
    return res.status(400).json({ message: "No Files found" });
  }
  return res.json(files);
});

export default route;
