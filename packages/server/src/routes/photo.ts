import express from "express";
import { createQueryBuilder } from "typeorm";

const photoRoute = express.Router();

photoRoute.post("/api/upload", async (req, res) => {
  const { photoId } = req.body;
  console.log(req.body);

  // await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values([
  //     // { firstName: "Timber", lastName: "Saw" },
  //     // { firstName: "Phantom", lastName: "Lancer" }
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
