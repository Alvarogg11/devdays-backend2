import { getAllUsers, createUser, deleteUser, changeUser, getUserById, saveUsers } from '../services/user.service.js';
import { trace } from '@opentelemetry/api';
import { metrics } from '@opentelemetry/api';

const tracer = trace.getTracer('user-controller-tracer');

export const getUsers = async (req, res) => {
    const span = tracer.startSpan('getUsers');
    try {
        //await new Promise(resolve => setTimeout(resolve, 500)); -> para modificar el tiempo que tarda en hacer la petición, cambia la duración en la traza
        const users = await getAllUsers();
        span.setAttribute('user.count', users.length); //atributo nuevo personalizado para la traza
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        span.end(); // Es importante cerrar siempre el span
    }
};

export const getUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const meter = metrics.getMeter('user-controller-meter');
const userCreationCounter = meter.createCounter('user_creation_count', {
    description: 'Counts number of users created',
    unit: "users",
});
export const addUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
        userCreationCounter.add(1);
    } catch (error) {
    console.error(error); //cambio temporal para ver error en consola
    res.status(500).json({ message: error.message });
    }
};

export const addUsers = async (req, res) => {
    try {
        const savedUsers = await saveUsers(req.body);
        res.status(201).json(savedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const deletedUser = await deleteUser(userId);
        if (deletedUser) {
            res.status(200).json(deletedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const updatedUser = await changeUser(userId,req.body); //por qué ponemos el req.body??
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};