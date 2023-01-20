import { Router } from "express";
import ChatController from "../controllers/ChatController";
import AuthController from "../controllers/AuthController";

const ChatRouter: Router = Router();
//Get
ChatRouter.get("/:id", AuthController.validateToken, ChatController.findChatById);
ChatRouter.get("/userId/:id", AuthController.validateToken, ChatController.findChatByUserId);
//Post
ChatRouter.post("/", AuthController.validateToken, ChatController.createChat);
//Put
ChatRouter.put("/message/:id", AuthController.validateToken, ChatController.updateMessages);

export { ChatRouter };
