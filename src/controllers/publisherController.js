import express from "express";
import publisher from "../entities/publisher.js";
import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm"; 

const routes = express.Router();
const publisherRepository = AppDataSource.getRepository(publisher);

//all publishers (não deletados)
routes.get("/", async (request, response) => {
    const publishers = await publisherRepository.find({
        where: { deleteAt: IsNull() },
    });
    response.status(200).send({ message: publishers });
});

//publishers por CNPJ (parâmetro na URL)
routes.get("/:nameFound", async (request, response) => {
    const { nameFound } = request.params;

    const publisherFound = await publisherRepository.find({
        where: {
            cnpj: Like(`%${nameFound}%`),
            deleteAt: IsNull()
        }
    });

    return response.status(200).send({ response: publisherFound });
});

//criar nova editora
routes.post("/", async (request, response) => {
    const { publisher_name, cnpj, email } = request.body;

    if (!publisher_name || publisher_name.length < 1) {
        return response.status(400).send({ response: "Campo nome deve ter pelo menos 1 caractere." });
    }

    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
        return response.status(400).send({ response: "Formato de email inválido" });
    }

    if (!cnpj || cnpj.length < 6) {
        return response.status(400).send({ response: "CNPJ deve ter no mínimo 6 caracteres" });
    }

    try {
        const newPublisher = publisherRepository.create({ publisher_name, email, cnpj });
        await publisherRepository.save(newPublisher);
        return response.status(201).send({ response: "Editora cadastrada com sucesso" });
    } catch (error) {
        return response.status(500).send({ erro: error.message });
    }
});

//atualizar editora
// Atualizar editora
routes.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { publisher_name, cnpj, email } = request.body;

  if (!id || isNaN(id)) {
    return response.status(400).send({ response: "ID inválido" });
  }

  if (!publisher_name || publisher_name.length < 1) {
    return response.status(400).send({ response: "Campo nome deve ter pelo menos 1 caractere." });
  }

  if (!email || !email.includes("@") || !email.includes(".") || email.length < 5) {
    return response.status(400).send({ response: "Formato de email inválido" });
  }

  if (!cnpj || cnpj.length < 6) {
    return response.status(400).send({ response: "CNPJ deve ter no mínimo 6 caracteres" });
  }

  try {
    const publisherFound = await publisherRepository.findOne({
      where: { id: Number(id), deleteAt: IsNull() }
    });

    if (!publisherFound) {
      return response.status(404).send({ response: "Editora não encontrada ou já excluída" });
    }

    await publisherRepository.update(Number(id), { publisher_name, cnpj, email });
    return response.status(200).send({ response: "Editora atualizada com sucesso!" });
  } catch (error) {
    return response.status(500).send({ erro: error.message });
  }
});


//soft delete
routes.delete("/:id", async (request, response) => {
    const { id } = request.params;

    if (isNaN(id)) {
        return response.status(400).json({ response: "O ID precisa ser numérico" });
    }

    const publisherFound = await publisherRepository.findOne({
        where: { id: Number(id), deleteAt: IsNull() },
    });

    if (!publisherFound) {
        return response.status(404).json({ response: "Editora não encontrada ou já excluída" });
    }

    await publisherRepository.update(id, { deleteAt: () => "CURRENT_TIMESTAMP" });

    return response.status(200).json({ response: "Editora removida com sucesso." });
});

export default routes;
