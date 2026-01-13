import issueService from '../services/issue.service.js';

export const getAllIssues = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; //valores por defecto si no ponemos nada en la petición
    try {
        const issues = await issueService.getAllIssues(page, limit); //obtenemos las issues aplicando los parámetros 
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getIssueByIssueId = async (req, res) => {
    const issueId = req.params.issueId;
    try {
        const issue = await issueService.getIssueByIssueId(issueId);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.status(200).json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
/*
export const fetchGithubIssues = async (req, res) => {
    const repoOwner = req.body.repository.owner;
    const repoName = req.body.repository.name;
    const page = parseInt(req.query.page) || 1; //parseamos los valores para que sean enteros
    const perPage = parseInt(req.query.perPage) || 30; //usamos o los valores que diga la petición o los por defecto (1/30)
    try {
        const githubIssues = await issueService.fetchGithubIssues(repoOwner, repoName, page, perPage);
        const savedIssues = await issueService.saveIssues(githubIssues);
        res.status(200).json(savedIssues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
*/
// src/controllers/issue.controller.js
export const fetchAndSyncAllIssues = async (req, res) => {
    const { owner, name } = req.body.repository;
    try {
        const allGithubIssues = await issueService.fetchAllGithubIssuesRecursive(owner, name);
        const savedIssues = await issueService.saveIssues(allGithubIssues);
        res.status(200).json({
            status: "Sincronización completa",
            totalFetched: allGithubIssues.length,
            data: savedIssues
        });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error); //error en la consola
        res.status(500).json({ 
            message: 'Error en la sincronización', 
            error: error.message //error en postman
        });
    }
};