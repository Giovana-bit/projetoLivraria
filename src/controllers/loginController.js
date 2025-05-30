import express, { request, response } from "express";
import User from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm";

const routes = express.Router();
const userRepository = AppDataSource.getRepository(User);

routes.post("/", async (request, response) => {
    const {email, password} = request.body;

    if (!email.includes("@")) {
        return response.status(400).send({"response":"O email informado é invalido"});
    }

    if (password.length < 6){
        return response.status(400).send({"response":"A senha deve conter pelo menos 6 caracteres"});
    }

    const user = await userRepository.findOneBy({
        email, password, deleteAt:IsNull()
    });

    console.log (">>>>>>", user);
});

export default routes;