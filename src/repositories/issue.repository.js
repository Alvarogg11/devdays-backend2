import Issue from '../models/issue.model.js';
//explicar por qué esto de limit y skip
const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Issue.find().skip(skip).limit(limit);
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
    create,
    findByIssueId,
};