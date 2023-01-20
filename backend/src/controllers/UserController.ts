import { Request, Response } from "express";
import UserModel from "../models/UserModel";

class UserController {
  public async findAll(req: Request, res: Response) {
    UserModel.find({}, {}, (err, users) => {
      if(err) return res.status(404).send({ message: err.message });
      res.status(200).json(users)
    })
  }

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params; 
    UserModel.findById(id, {}, (err, user) => {
      if(err || user === null) return res.status(404).send({ message: err?.message });
      return res.status(200).json(user)
    })
  }

  public findByEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    UserModel.findOne({ 'email': email }, {}, (err, user) => {
      if(err || user === null) return res.status(404).send({ message: err?.message });
      return res.status(200).json(user)
    })
  }

  public createUser = async (req: Request, res: Response) => {
    const userModel = new UserModel(req.body);

    userModel.save((err) => {
      if(err) return res.status(500).send({ message: err.message });
      return res.status(201).json(userModel)
    })
  }

  public deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    UserModel.findByIdAndDelete(id, (err: unknown) => {
      if(err) return res.status(500).send({ message: err });
      return res.status(200).json({ message: "User successfully deleted" })
     });
  }

  public updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    UserModel.findByIdAndUpdate(id, {$set: req.body}, (err: unknown) => {
      if(err) return res.status(500).send({ message: err });
      return res.status(204).json({ message: "User successfully updated" })
     });
  }

  public updateFavorite = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { favorites } = req.body;
    UserModel.findByIdAndUpdate(id, {$push: { "favorites": favorites } }, (err: unknown) => {
      if(err) return res.status(500).send({ message: err });
      return res.status(204).json({ message: "User successfully updated" })
     });
  }

  public deleteFavorite = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { favorites } = req.body;
    UserModel.findByIdAndUpdate(id, {$pull: { "favorites": favorites } }, (err: unknown) => {
      if(err) return res.status(500).send({ message: err });
      return res.status(204).json({ message: "Pet successfully deleted from favorites" })
     });
  }
}

export const userController = new UserController();
