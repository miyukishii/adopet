import mongoose from "mongoose"

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://zephyr664:12345@cluster0.87x6vqi.mongodb.net/?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;