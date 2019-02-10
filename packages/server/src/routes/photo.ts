import express from "express";
import { createQueryBuilder } from "typeorm";
// import { Photo } from "../entity/photo";

const photoRoute = express.Router();
interface PhotoData {
  originalFilename: string;
  photoId: string;
  size: number;
  uploadedUser?: string;
}

photoRoute.post("/api/upload", async (req, res) => {
  const data: PhotoData[] = req.body.data;
  console.log(req.body);
  const values = data.map(arr => {
    return { ...arr, uploadedUser: req.session!.userId };
  });
  console.log(values);
  // await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(Photo)
  //   .values([

  //   ])
  //   .execute();

  return res.json({
    ok: true
  });
});

photoRoute.get("/api/allPics", async (req, res) => {
  const user = await createQueryBuilder("user")
    .leftJoinAndSelect("user.photos", "photo")
    .where("user.id = :id", { id: req.session!.userId })
    .getOne();
  console.log(user);
  return res.json({});
});

export default photoRoute;
