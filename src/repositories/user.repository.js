import User from "../models/user.model.js";

const findAll = async () => {
 return await User.find();
};

const findByUserId = async (userId) => {
 return await User.findOne({userId});
};

const create = async (userData) => {
 const user = new User(userData);
 return await user.save();
};

const update = async (userId, userData) => {
    return await User.findOneAndUpdate({ userId }, userData, { new: true }); // { new: true } devuelve el documento ya actualizado en lugar del antiguo
};

const remove = async (userId) => {
    return await User.findOneAndDelete({ userId });
};

export default {
 findAll,
 create,
 findByUserId,
 update,
 remove,
};