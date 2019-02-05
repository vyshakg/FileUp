import express from "express";
import { Photo } from "../entity/photo";

const fileRoute = express.Router();

fileRoute.post("/api/upload", async (req, res) => {
  const photo = Photo.create({});
  const photoRecourd = await photo.save();

  return res.json({
    ok: true
  });
});

fileRoute.get("/api/allPics", async (req, res) => {
  const files = await Photo.find();
  if (!files) {
    return res.status(400).json({ message: "No Files found" });
  }
  return res.json(files);
});

export default fileRoute;
