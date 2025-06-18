import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { AppDataSource } from "../database/data-source.js";
import cloudinary from "../helpers/cloudinary.js";
import Profile from "../entities/profile.js";
import User from "../entities/user.js";
import { IsNull } from "typeorm";

const upload = multer({ dest: "./src/upload/" });
const routes = Router();

routes.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Imagem não enviada" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: req.user.email, deletedAt: IsNull() },
    });

    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    const profileRepository = AppDataSource.getRepository(Profile);
    const profile = profileRepository.create({ image: imageUrl, user });
    await profileRepository.save(profile);

    fs.unlinkSync(req.file.path); // Remove arquivo temporário

    return res.status(201).json({ message: "Imagem enviada", url: imageUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no upload" });
  }
});

export default routes;