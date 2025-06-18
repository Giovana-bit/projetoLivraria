import express from "express";
import userController from "./controllers/userController.js";
import authorController from "./controllers/authorControler.js";
import category from "./controllers/category.js";
import publisherController from "./controllers/publisherController.js";
import bookController from "./controllers/bookController.js"; 
import loginController from "./controllers/loginController.js";
import {authenticate} from "./utils/jwt.js";
import uploadController from "./controllers/uploadController.js"


const route = express();

route.use("/user", userController);
route.use("/author", authenticate,authorController);
route.use("/category", category);
route.use("/publisher", publisherController);
route.use("/book", bookController);
route.use("/login", loginController);
route.use("/upload", authenticate, uploadController);

export default route;
