import express from "express";
import { getConnection, getRepository } from "typeorm";
import { Photo } from "../entity/photo";

const photoRoute = express.Router();
interface PhotoData {
  originalFilename: string;
  photoId: string;
  size: number;
  uploadedUser?: string;
}

photoRoute.post("/api/upload", async (req, res) => {
  try {
    const data: PhotoData[] = req.body.data;
    const values = data.map(arr => {
      return { ...arr, uploadedUser: req.session!.userId };
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Photo)
      .values(values)
      .execute();

    return res.json({
      ok: true
    });
  } catch (e) {
    console.log(e);
    return res.json({ ok: false });
  }
});

photoRoute.get("/api/allpics", async (req, res) => {
  try {
    const photos = await getRepository(Photo)
      .createQueryBuilder("photo")
      .select(["photo.id", "photo.originalFilename", "photo.photoId", "photo.size", "photo.favouritePhoto"])
      .leftJoin("photo.uploadedUser", "uploadedUser")
      .where("uploadedUser.id = :id", { id: req.session!.userId })
      .getMany();

    return res.json(photos);
  } catch (e) {
    console.log(e);
    return res.json([]);
  }
});

export default photoRoute;
