import express from "express";
import Book from "../entities/book.js";
import Category from "../entities/category.js";
import Publisher from "../entities/publisher.js";
import { AppDataSource } from "../database/data-source.js";
import { IsNull } from "typeorm";

const route = express.Router();

const bookRepository = AppDataSource.getRepository(Book);
const categoryRepository = AppDataSource.getRepository(Category);
const publisherRepository = AppDataSource.getTreeRepository(Publisher);

route.post("/", async (request, response) => {
  const { book_name, publication, pages, price, editorId, categoryId } = request.body;

  if (!book_name || book_name.length < 1) {
    return response.status(400).send({ response: "Campo 'book_name' deve ter pelo menos 1 caractere" });
  }

  try {
    const publisher = await publisherRepository.findOneBy({
      id: editorId,
      deleteAt: IsNull()
    });

    if (!publisher) {
      return response.status(400).send({ response: "Editora informada não encontrada." });
    }

    const category = await categoryRepository.findOneBy({
      id: categoryId,
      deleteAt: IsNull()
    });

    if (!category) {
      return response.status(400).send({ response: "Categoria informada não encontrada" });
    }

    const newBook = bookRepository.create({
      book_name,
      publication,
      pages,
      price,
      publisher,
      category
    });

    await bookRepository.save(newBook);
    return response.status(201).send({ response: "Livro cadastrado com sucesso." });

  } catch (err) {
    console.error("Erro ao cadastrar livro:", err);
    return response.status(500).send({ response: "Erro interno ao cadastrar livro." });
  }
});

export default route;
