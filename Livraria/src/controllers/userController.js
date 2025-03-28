import e from "express";
import express, { request, response } from "express";

const routes = express.Router();

routes.get("/", (request, response) => {
    response.status(200).send("Deu tudo certo!")
})

routes.post("/", (request, response) => {

    //const name = request.body.name;
    //const email = request.body.email;
    //const password = request.body.password;

    const{name, email, password, typeUser} = request.body;

    //console.log(name)
    //console.log(email)
    //console.log(password)

    //Validação dos campos obrigatórios
    if(name.length < 1) {
        return response.status(400).send({"response": "Campo 'name' necessita de um caractere."});
    }

    //validação e-mail
    if (!email.includes("@")) {
        return response.status(400).send({ "response": "O campo 'email' está em um formato inválido." });
    }

    //validação de tamanho de senha 
    if(password.length < 6) {
        return response.status(400).send({"response": "A senha ter que ter no minimo 6 caracteres"})
    }

    //Validação tipo de usuario
    if(typeUser !== "admin" && typeUser !== "comum") {
        return response.status(400).send({"response": "Você tem que ser 'admin' ou 'comum'"})
    }

    return response.status(201).send({"message": "Cadastrado com sucesso", "user": {name, email, typeUser}})
})

export default routes;
