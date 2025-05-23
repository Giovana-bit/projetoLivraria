import express from "express";
import { Like, IsNull } from "typeorm";
import category from "../entities/category.js"; 
import { AppDataSource } from "../database/data-source.js";

const routes = express.Router();
const categoryRepository = AppDataSource.getRepository(category);

// Buscar todas as categorias
routes.get("/", async (request, response) => {
  const categories = await categoryRepository.find({
    where: { deleteAt: IsNull() } // opcional: mostra apenas as não deletadas
  });
  response.status(200).send({ message: categories });
});

// Buscar categoria por nome (parcial)
routes.get("/:nameFound", async (request, response) => {
  const { nameFound } = request.params;

  const categories = await categoryRepository.find({
    where: {
      name_category: Like(`%${nameFound}%`),
      deleteAt: IsNull()
    }
  });

  return response.status(200).send({ response: categories });
});

// Criar nova categoria
routes.post("/", async (request, response) => {
  const { name_category } = request.body;

  if (!name_category || name_category.length < 1) {
    return response.status(400).send({
      response: "Campo name_category deve ter pelo menos 1 caractere."
    });
  }

  try {
    const newCategory = categoryRepository.create({ name_category });
    await categoryRepository.save(newCategory);

    return response.status(201).send({ response: "Categoria cadastrada com sucesso!" });
  } catch (error) {
    return response.status(500).send({ erro: error.message });
  }
});

// Atualizar categoria
// Atualizar categoria
routes.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { name_category } = request.body;

  if (!id || isNaN(id)) {
    return response.status(400).send({ response: "ID inválido." });
  }

  if (!name_category || name_category.length < 1) {
    return response.status(400).send({
      response: "Campo name_category deve ter pelo menos 1 caractere."
    });
  }

  try {
    const category = await categoryRepository.findOne({
      where: { id: Number(id), deleteAt: IsNull() }
    });

    if (!category) {
      return response.status(404).send({ response: "Categoria não encontrada ou já excluída." });
    }

    await categoryRepository.update(Number(id), { name_category });

    return response.status(200).send({ response: "Categoria atualizada com sucesso!" });
  } catch (error) {
    return response.status(500).send({ erro: error.message });
  }
});


// Soft delete da categoria
routes.delete("/:id", async (request, response) => {
  const { id } = request.params;

  if (isNaN(id)) {
    return response.status(400).json({ response: "O id precisa ser numérico" });
  }

  const category = await categoryRepository.findOne({
    where: { id: Number(id), deleteAt: IsNull() }
  });

  if (!category) {
    return response.status(404).json({ response: "Categoria não encontrada ou já excluída" });
  }

  await categoryRepository.update(id, { deleteAt: new Date() });

  return response.status(200).json({ response: "Categoria removida com sucesso." });
});

export default routes;
