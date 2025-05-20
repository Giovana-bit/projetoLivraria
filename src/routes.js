import express from "express";
import userController from "./controllers/userController.js";
import authorController from "./controllers/authorControler.js";
import category from "./controllers/category.js";
import publisherController from "./controllers/publisherController.js";


const route = express();

route.use("/user", userController);
route.use("/author", authorController);
route.use("/category", category);
route.use("/publisher", publisherController);

export default route;
