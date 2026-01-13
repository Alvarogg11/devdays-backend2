import Issue from '../models/issue.model.js';

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Issue.find().skip(skip).limit(limit);
};

//para obtener todas las issues sin paginación (al usar findAll en audit solo usamos 10 issues)
const findAllUnpaginated = async () => {
    return await Issue.find(); 
};

const findByIssueId = async (issueId) => {
    return await Issue.findOne({ issueId });
};

const create = async (issueData) => {
    const issue = new Issue(issueData);
    return await issue.save();
};

export default {
    findAll,
    findAllUnpaginated,
    create,
    findByIssueId,
};