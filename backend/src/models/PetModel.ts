import { Schema, model, connect } from 'mongoose';
import IPet from "../interfaces/PetInterface"

const PetSchema = new Schema<IPet>({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  description: { type: String, required: true },
  giverId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  state: { type: String, required: true },
  years: { type: String, required: true },
  photos: [{ type: String, required: false }],
});

const Pet = model<IPet>('Pet', PetSchema);

export default Pet;
