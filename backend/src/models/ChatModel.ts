import { Schema, model, connect } from 'mongoose';
import IChat from "../interfaces/ChatInterface"

const ChatSchema = new Schema<IChat>({
  userId: { type: Schema.Types.ObjectId, required: true },
  giverId: { type: Schema.Types.ObjectId, required: true },
  messages: [{
    author: { type: String },
    message: { type: String },
    time: { type: Schema.Types.Date }
  }],
});

const Chat = model<IChat>('Chat', ChatSchema);

export default Chat;
