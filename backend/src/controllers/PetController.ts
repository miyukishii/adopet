import { Request, Response } from "express";
import PetModel from "../models/PetModel";

class PetController {
  static async findAll(req: Request, res: Response) {
    PetModel.find({}, {}, (err, users) => {
      if(err) return res.status(404).send({ message: err.message });
      return res.status(200).json(users);
    })
  }

  static findById = async (req: Request, res: Response) => {
    const { id } = req.params; 
    PetModel.findById(id, {}, (err, user) => {
      if(err || user === null) return res.status(404).send({ message: err?.message });
      return res.status(200).json(user)
    })
  }

  static findByGiverId = async (req: Request, res: Response) => {
    const { id } = req.params;
    PetModel.find({ 'giverId': id }, {}, (err, user) => {
      if(err || user === null) return res.status(404).send({ message: err?.message });
      return res.status(200).json(user)
    });
  }

  static findByState = async (req: Request, res: Response) => {
    const { q } = req.query;
    PetModel.find({ "state": q }, {}, (err, users) => {
      if(err) return res.status(404).send({ message: err.message });
      return res.status(200).json(users);
    })
  }

  static async createPet(req: Request, res: Response) {
    const pet = new PetModel(req.body);

    console.log(req.body);
    

    pet.save((err) => {
      if(err) return res.status(500).send({ message: err.message });
      res.status(201).json(pet)
    })
  };

  static deletePet = async (req: Request, res: Response) => {
    const { id } = req.params;

    PetModel.findByIdAndDelete(id, (err: unknown) => {
      if(err) return res.status(500).send({ message: err });
      return res.status(200).json({ message: "Pet successfully deleted" })
     });
  }

  static updatePet = async (req: Request, res: Response) => {
    const { id } = req.params;
    PetModel.findByIdAndUpdate(id, {$set: req.body}, (err: unknown) => {
      if(err) return res.status(500).send({ message: err });
      res.status(204).json({ message: "Pet successfully updated" })
     });
  }
}

export default PetController;

