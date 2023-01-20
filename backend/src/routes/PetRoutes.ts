import { Router } from "express";
import PetController from "../controllers/PetController";
import AuthController from "../controllers/AuthController";

const PetRouter: Router = Router();
//Get
PetRouter.get("/", PetController.findAll);
PetRouter.get("/petByUserId", PetController.findByState);
PetRouter.get("/:id", PetController.findById);
PetRouter.get("/giver/:id", AuthController.validateToken, PetController.findByGiverId);
//Post
PetRouter.post("/", AuthController.validateToken, PetController.createPet);
//Put
PetRouter.put("/:id", AuthController.validateToken, PetController.updatePet);
//Delete
PetRouter.delete("/:id", AuthController.validateToken, PetController.deletePet);

export { PetRouter };
