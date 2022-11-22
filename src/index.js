import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().min(1).required(),
});

const messageSchema = joi.object({
    to: joi.string().required().min(1), 
    text: joi.string().required().min(1), 
    type: joi.string().valid('message').valid('private_message').required()
});

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
  
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
try {
    await mongoClient.connect();
    db = mongoClient.db("usuarios");
} catch(error) {
    console.log(error);
}

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});