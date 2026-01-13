import axios from 'axios';
import IssueRepository from '../repositories/issue.repository.js';

export const getAllIssues = async (page, limit, wantsEverything) => {
    if (wantsEverything) {
        return await IssueRepository.findAllUnpaginated(); //si es true, traemos todas las issues sin paginación
    }
    return await IssueRepository.findAll(page, limit); // eoc -> devolvemos paginado
};

export const getIssueByIssueId = async (issueId) => {
    return await IssueRepository.findByIssueId(issueId);
};
// usamos valores predefinidos en caso de que el usuario no mande nada para page y perpage (vamos a dejar esta función pero no la usamos en el controlador)
export const fetchGithubIssues = async (repoOwner, repoName, page=1, perPage= 30) => { 
    const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/issues?state=all&page=${page}&per_page=${perPage}`); //esto no estoy seguro
    return response.data;
};

//función recursiva para traer todas las issues 
export const fetchAllGithubIssuesRecursive = async (repoOwner, repoName, page = 1, allIssues = []) => {
    if (page > 10) { //límite de páginas para evitar bucles infinitos y errores de github 422  (porque el máximo es de 1000 issues)
        return allIssues;
    }
    const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        params: { state: 'all', page: page, per_page: 100 }
    });
    const currentIssues = response.data;
    if (currentIssues.length === 0) { //llegada al caso base
        return allIssues;
    }
    /*console.log(`Descargada página ${page} con ${currentIssues.length} issues...`);*/
    return fetchAllGithubIssuesRecursive( //llamada recursiva a la función para seguir trayendo issues
        repoOwner, 
        repoName, 
        page + 1, 
        allIssues.concat(currentIssues)
    );
};

export const saveIssues = async (issues) => {
    const savedIssues = [];
    for (const issueData of issues) {
        const existingIssue = await IssueRepository.findByIssueId(issueData.id);
        if (!existingIssue) {
            // DONE: Store the updated_at field from the GitHub issue
            const newIssue = {
                issueId: issueData.id,
                number: issueData.number,
                title: issueData.title,
                body: issueData.body,
                url: issueData.html_url,
                state: issueData.state,
                createdAt: issueData.created_at,
                updatedAt: issueData.updated_at,
            };
            savedIssues.push(await IssueRepository.create(newIssue));
        } else {
            savedIssues.push(existingIssue);
        }
    };
    return savedIssues;
};

export default {
    getAllIssues,
    getIssueByIssueId,
    fetchGithubIssues,
    fetchAllGithubIssuesRecursive,
    saveIssues
};