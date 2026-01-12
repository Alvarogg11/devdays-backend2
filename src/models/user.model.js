import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: () => randomUUID() //genera un id único por defecto
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
},
{versionKey: false, toJSON: { transform: (doc, ret) => { return { id: ret.userId, name: ret.name, email: ret.email }; } } }); //para quitar "__v" de las respuestas y devolver id como userId

const User = mongoose.model('User', userSchema);

export default User;