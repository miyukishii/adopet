import { Router } from "express";
import { userController } from "../controllers/UserController";
import AuthController from "../controllers/AuthController"

const AuthRouter: Router = Router();
//Get
AuthRouter.get("/email", userController.findByEmail);
AuthRouter.get("/:id", userController.findById);
AuthRouter.get("/", AuthController.validateToken, userController.findAll);
//Post
AuthRouter.post("/signup", userController.createUser);
AuthRouter.post("/login",  AuthController.validateBody, AuthController.loginAuth);
//Put
AuthRouter.put("/:id", AuthController.validateToken, userController.updateUser);
AuthRouter.put("/favorite/:id", AuthController.validateToken, userController.updateFavorite);
AuthRouter.put("/favoriteDelete/:id", AuthController.validateToken, userController.deleteFavorite);
//Delete
AuthRouter.delete("/:id", AuthController.validateToken, userController.deleteUser);

export { AuthRouter };
