import express from "express";
import { AuthRouter } from "./routes/AuthRoutes";
import { ChatRouter } from "./routes/ChatRoutes";
import { PetRouter } from "./routes/PetRoutes";
import db from "./config/dbConfig"

db.on("error", console.log.bind(console, 'error connecting to DB \n'))
db.once("open", () => console.log("successful connecting to DB"));


export class App {
  public server: express.Application = express();
  private config():void {
    const accessControl: express.RequestHandler = (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.server.use(express.json());
    this.server.use(accessControl);
  }

  constructor() {
    this.server;
    this.config();
    this.router();
  }

  private router(){
    this.server.use("/pets", PetRouter);
    this.server.use("/", AuthRouter);
    this.server.use("/chat", ChatRouter);
  }
}