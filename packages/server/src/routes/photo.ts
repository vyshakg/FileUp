// import cloudinary from "cloudinary";
import express from "express";
import { getConnection, getRepository } from "typeorm";
import { Photo } from "../entity/photo";
import cloudinary from "../utils/cloudinarySetup";
import isAuthenticated from "./middleware/isAuthenticated";

const photoRoute = express.Router();
interface PhotoData {
  originalFilename: string;
  photoId: string;
  size: number;
  uploadedUser?: string;
}

photoRoute.post("/api/upload", isAuthenticated, async (req, res) => {
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

photoRoute.get("/api/allpics", isAuthenticated, async (req, res) => {
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

photoRoute.post("/api/delete", isAuthenticated, async (req, res) => {
  try {
    const id = req.body.id;

    const photo = await Photo.findOne({ id });
    if (photo) {
      cloudinary().api.delete_resources([photo.photoId], async (error: any, result: any) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        }
        await Photo.delete({ id });
        return res.json({
          ok: true,
          id
        });
      });
    } else {
      return res.status(400).json({
        ok: false
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ ok: false });
  }
});

export default photoRoute;
