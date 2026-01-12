import { Router } from "express";
import { addUser, getUser, getUsers, removeUser , updateUser, addUsers} from "../controllers/user.controller.js";
import { validateCreateUser } from "../middlewares/user.middleware.js";


const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.post('/users', validateCreateUser, addUser);
userRouter.delete('/users/:id', removeUser);
userRouter.put('/users/:id',validateCreateUser, updateUser); //usamos el middleware por si alguien intenta no hacer lo especificado
// DONE: userRouter.put for updating a user (extra)

export { userRouter };