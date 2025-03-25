import express, { request, response } from "express";

const routes = express.Router();

routes.get("/", (request, response) => {
    response.status(200).send("Deu tudo certo!")
})

routes.post("/", (request, response) => {
    response.status(200).send("Método Post ok!")

    //const name = request.body.name;
    //const email = request.body.email;
    //const password = request.body.password;
    
    const{name, email, password} = request.body;
    
    console.log(name)
    console.log(email)
    console.log(password)
})

export default routes;
