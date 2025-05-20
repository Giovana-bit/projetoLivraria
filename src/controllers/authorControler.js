import express, { request, response } from "express";
import Author from "../entities/author.js";
import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm";

const routes = express.Router();
const authorRepository = AppDataSource.getRepository(Author);

routes.get("/", async (request, response) => {
  const authors = await authorRepository.find();
  response.status(200).json({ message: authors });
});

routes.post("/", async (request, response) => {
  const { name_author, nasc_author, nationality } = request.body;

  if (name_author.length < 1) {
    return response.status(400).json({ response: "Campo nome do autor deve ter pelo menos 1 caractere" });
  }

  if (nasc_author.length < 1) {
    return response.status(400).json({ response: "Campo nascimento do autor deve ter pelo menos 1 caractere" });
  }

  if (nationality.length < 1) {
    return response.status(400).json({ response: "Campo nacionalidade deve ter pelo menos 1 caractere" });
  }

  try {
    const newAuthor = authorRepository.create({ name_author, nasc_author, nationality });
    await authorRepository.save(newAuthor);
    return response.status(201).json({ response: "Autor cadastrado com sucesso" });
  } catch (error) {
    return response.status(500).json({ erro: error });
  }
});

routes.get("/:nameFound", async (request, response) => {
  const { nameFound } = request.params;
  const authorFound = await authorRepository.find({ where: { name_author: Like(`%${nameFound}%`) } });
  return response.status(200).json({ response: authorFound });
});

// Soft Delete de Autor
routes.delete("/:id", async (request, response) => {
  const { id } = request.params;

  if (isNaN(id)) {
    return response.status(400).json({ response: "O id precisa ser numérico" });
  }

  const author = await authorRepository.findOne({ where: { id: Number(id), deleteAt: IsNull() } });

  if (!author) {
    return response.status(404).json({ response: "Autor não encontrado ou já excluído" });
  }

  await authorRepository.update(id, { deleteAt: () => "CURRENT_TIMESTAMP" });

  return response.status(200).json({ response: "Autor removido com sucesso." });
});

export default routes;
