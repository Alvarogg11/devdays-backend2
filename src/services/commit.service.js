import axios from 'axios';
import CommitRepository from '../repositories/commit.repository.js';

export const getAllCommits = async (page, limit) => {
    return await CommitRepository.findAll(page, limit);
};

export const fetchGithubCommits = async (repoOwner, repoName, page = 1, perPage = 30) => {
    const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`, {
        params: {
            page: page,
            per_page: perPage
        } //manera distinta a las issues (por ir probando)
    });
    return response.data;
};

export const saveCommits = async (commits, repoFullName) => {
    const savedCommits = [];
    for (const commitData of commits) {
        const existingCommit = await CommitRepository.findBySha(commitData.sha);
        if (!existingCommit) { //en caso de que no exista el commit, lo creamos con los datos necesarios
            const newCommit = {
                sha: commitData.sha,
                message: commitData.commit.message,
                author: commitData.commit.author.name,
                date: commitData.commit.author.date,
                url: commitData.html_url,
                repository: repoFullName
            };
            savedCommits.push(await CommitRepository.create(newCommit)); //lo guardamos y añadimos a la lista de guardados
        } else {
            savedCommits.push(existingCommit);
        }
    }
    return savedCommits;
};

export default {
    getAllCommits,
    fetchGithubCommits,
    saveCommits
};