import { randomUUID } from 'crypto'; //para generar ids únicos
import userRepository from '../repositories/user.repository.js';

export const getAllUsers = async () => {
    return await userRepository.findAll();
};

export const getUserById = async (id) => { 
    return await userRepository.findByUserId(id);
};

export const createUser = async (userData) => {
    const newUser = {
        ...userData, //mirar por qué los puntos suspensivos al inicio
        userId: randomUUID() // parar generar un ID automático 
    };
    return await userRepository.create(newUser);
};

export const deleteUser = async (id) => {
    return await userRepository.remove(id); //eliminado de aquí y la cabecera userData debería ponerlo?
};

export const changeUser = async (id, userData) => {
    return await userRepository.update(id, userData); //para usar repositorio y no los datos del array en memoria
};

export const saveUsers = async (users) => {
    const savedUsers = [];
    for (const userData of users) {
        const existingUser = await userRepository.findByUserId(userData.id);
        if (!existingUser) {
            const newUser = {
                userId: userData.id,
                name: userData.name,
                email: userData.email,
            };
            savedUsers.push(await userRepository.create(newUser));
        } else {
            savedUsers.push(existingUser);
        }
    };
    return savedUsers;
};


