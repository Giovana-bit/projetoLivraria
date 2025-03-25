import express, { request, response } from "express";

const routes = express.Router();

routes.get("/", (request, response) => {
    response.status(200).send("Deu tudo certo!")
})

export default routes;
