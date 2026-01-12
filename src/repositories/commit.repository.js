import Commit from '../models/commit.model.js';

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Commit.find().skip(skip).limit(limit); //para permitir paginación de commits
};

const findBySha = async (sha) => {
    return await Commit.findOne({ sha });
};

const create = async (commitData) => {
    const commit = new Commit(commitData);
    return await commit.save();
};

export default {
    findAll,
    findBySha,
    create,
};