import { ObjectId } from 'mongodb';
import db from "../config/dbConfig";
import IUser from '../interfaces/UserInterface';

export default class UserServices {
  collection: any;

  constructor(_collection: any) {
    this.collection = db.collection(_collection);
  }

  public findAll = async () => {
    const result = await this.collection.find().toArray();
    return result;
  }
  
  public findById = async (id: string) => {
    const result = await this.collection.findOne({ _id: new ObjectId(id) });
    return result;
  }

  public findByEmail = async (userEmail: unknown) => {
    const result = await this.collection.findOne({ "email": userEmail });
    return result;
  }

  public findByState = async (userState: unknown) => {
    const result = await this.collection.find({ "userId": userState });
    return result;
  }

  public updateById = async (id: string, email: IUser, password: IUser) => {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { email, password },
    }); 
    return result;
  }

  public createOne = async (email: IUser, password: IUser, fullName: IUser, state: IUser, avatar: IUser) => {
    const result = await this.collection.insertOne({ email, password, fullName, state, avatar });
    return result;
  }

  public deleteOne = async (id: string) => {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  }
};