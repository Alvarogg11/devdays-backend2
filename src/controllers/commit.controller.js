import commitService from '../services/commit.service.js';

export const getCommits = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const commits = await commitService.getAllCommits(page, limit);
        res.status(200).json(commits);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const fetchAndSaveCommits = async (req, res) => {
    const { owner, name } = req.body.repository;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 30;

    try {
        const githubCommits = await commitService.fetchGithubCommits(owner, name, page, perPage);
        const savedCommits = await commitService.saveCommits(githubCommits, `${owner}/${name}`);
        res.status(200).json(savedCommits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};