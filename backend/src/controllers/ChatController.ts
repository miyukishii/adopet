import { Request, Response, NextFunction } from 'express';
import ChatModel from "../models/ChatModel";

export default class ChatController {
  static async createChat(req: Request, res: Response) {
    const chatBody = new ChatModel(req.body);

    const {userId, giverId} = req.body;
    
    ChatModel.findOne({
       $and: [
        {$or: [{ giverId: userId }, { userId: userId } ]},
        {$or: [{ giverId: giverId }, { userId: giverId } ]},
       ]
      }, {}, (err, chat) => {
      if(chat == null && !err) {
        chatBody.save((err, newChat) => {
          if(err) return res.status(500).send({ message: err.message });
          return res.status(201).json(newChat._id)
        })
      } else {
        return res.status(500).json("Chat already in progress")
      }
    })
  };

  static async findChatById(req: Request, res: Response) {
    const { id } = req.params;

    ChatModel.findById(id, {}, (err, chat) => {
      if(err) return res.status(404).send({ message: err.message });
      return res.status(200).json(chat);
    })
  };

  static async findChatByUserId(req: Request, res: Response) {
    const { id } = req.params;

    ChatModel.find({ $or: [{ giverId: id}, { userId: id } ]}, {}, (err, chat) => {
      if(err) return res.status(404).send({ message: err.message });
      return res.status(200).json(chat);
    })
    
  };

  static async updateMessages(req: Request, res: Response) {
    const { id } = req.params;
    const { messages } = req.body

    try {
      ChatModel.findByIdAndUpdate(id, { $push: { "messages": messages } },
      {}, (err, chat) => {
      if(err) return res.status(404).send({ message: err.message });
      return res.status(204).json(chat);
    })
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
