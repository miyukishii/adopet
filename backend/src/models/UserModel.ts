import { Schema, model, connect } from 'mongoose';
import IUser from "../interfaces/UserInterface"

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  state: { type: String, required: true },
  token: { type: String, required: false },
  avatar: { type: String, required: false },
  favorites: [{ type: String, required: false }]
});

const User = model<IUser>('User', userSchema);

export default User;
