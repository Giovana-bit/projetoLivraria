import express from "express";
import User from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import { IsNull } from "typeorm";
import { generateToken } from "../utils/jwt.js";
import { generateNewPassword } from "../utils/login.js";
import { sendEmail } from "../helpers/nodemailer.js";

const routes = express.Router();
const userRepository = AppDataSource.getRepository(User);

// Rota de login
routes.post("/", async (request, response) => {
    const { email, password } = request.body;

    if (!email.includes("@")) {
        return response.status(400).send({ response: "O email informado é inválido!" });
    }

    if (password.length < 6) {
        return response.status(400).send({ response: "A senha deve conter pelo menos 6 caracteres." });
    }

    const user = await userRepository.findOneBy({
        email,
        password,
        deleteAt: IsNull()
    });

    if (!user) {
        return response.status(401).send({ response: "Usuário ou senha inválida" });
    }

    const token = generateToken({
        user: user.name,
        email: user.email,
        typeUser: user.typeUser
    });

    return response.status(200).send({
        response: "Login efetuado com sucesso!",
        token
    });
});

// Rota de redefinição de senha
routes.put("/reset", async (request, response) => {
    const { email } = request.body;

    const user = await userRepository.findOneBy({
        email,
        deleteAt: IsNull()
    });

    if (!user) {
        return response.status(400).send({ response: "Email inválido!" });
    }

    const newPassword = generateNewPassword();

    await userRepository.update({ email }, { password: newPassword });

    await sendEmail(newPassword, email);

    return response.status(200).send({ response: "Senha enviada para o email cadastrado" });
});

export default routes;
