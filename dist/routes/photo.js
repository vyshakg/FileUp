"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const photo_1 = require("../entity/photo");
const cloudinarySetup_1 = __importDefault(require("../utils/cloudinarySetup"));
const isAuthenticated_1 = __importDefault(require("./middleware/isAuthenticated"));
const photoRoute = express_1.default.Router();
photoRoute.post("/api/upload", isAuthenticated_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        const values = data.map(arr => {
            return Object.assign({}, arr, { uploadedUser: req.session.userId });
        });
        yield typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(photo_1.Photo)
            .values(values)
            .execute();
        return res.json({
            ok: true
        });
    }
    catch (e) {
        console.log(e);
        return res.json({ ok: false });
    }
}));
photoRoute.get("/api/allpics", isAuthenticated_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const photos = yield typeorm_1.getRepository(photo_1.Photo)
            .createQueryBuilder("photo")
            .select(["photo.id", "photo.originalFilename", "photo.photoId", "photo.size", "photo.favouritePhoto"])
            .leftJoin("photo.uploadedUser", "uploadedUser")
            .where("uploadedUser.id = :id", { id: req.session.userId })
            .getMany();
        return res.json(photos);
    }
    catch (e) {
        console.log(e);
        return res.json([]);
    }
}));
photoRoute.post("/api/delete", isAuthenticated_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const photo = yield photo_1.Photo.findOne({ id });
        if (photo) {
            cloudinarySetup_1.default().api.delete_resources([photo.photoId], (error, result) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    console.log(error);
                    throw new Error(error);
                }
                yield photo_1.Photo.delete({ id });
                return res.json({
                    ok: true,
                    id
                });
            }));
        }
        else {
            return res.status(400).json({
                ok: false
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ ok: false });
    }
}));
photoRoute.post("/api/favourite", isAuthenticated_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const photo = yield photo_1.Photo.findOne({ id });
        if (photo) {
            yield photo_1.Photo.update({ id }, { favouritePhoto: true });
            return res.json({
                ok: true,
                id
            });
        }
        else {
            return res.status(400).json({
                ok: false
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ ok: false });
    }
}));
exports.default = photoRoute;
//# sourceMappingURL=photo.js.map