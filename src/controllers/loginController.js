import express, { request, response } from "express";
import User from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm";
import {generateToken} from "../utils/jwt.js";

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

    if (!user) {
        return response.status(401).send({"response":"Usuário ou senha incorreta"});
    }
    const token = generateToken({user:user.name, email:user.email, typeUser:user.typeUser})
    return response.status(200).send({
     response: "Login efetuado com sucesso!",
     token
    });

});

export default routes;
