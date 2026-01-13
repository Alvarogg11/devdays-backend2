import auditRepository from '../repositories/audit.repository.js';
import IssueRepository from '../repositories/issue.repository.js';

export const getAllAudits = async () => {
 return await auditRepository.findAll();
};

export const getAuditById = async (id) => {
 return await auditRepository.findByAuditId(id);
};

export const auditIssues = async () => {
 const issues = await IssueRepository.findAllUnpaginated();  //cambiado el método para usar todas las issues de la base de datos
 const issuesWithBugInTitle = issues.filter(issue => /bug/i.test(issue.title));
 const totalIssues = issues.length;
 const ratioWithBugInTitle = totalIssues === 0 ? 0 : issuesWithBugInTitle.length / totalIssues;

 const auditRecord = {
  auditId: `audit-${Date.now()}`,
  createdAt: new Date(),
  compliant: ratioWithBugInTitle <= 0.50,
  metadata: {
   totalIssues: totalIssues,
   issuesWithBugInTitle: issuesWithBugInTitle.length,
   ratioWithBugInTitle: ratioWithBugInTitle,
   operation: 'ratioWithBugInTitle <= 0.50'
  },
  evidences: issuesWithBugInTitle
 };

 const auditCreated = await auditRepository.create(auditRecord);
 return auditCreated;
};

export default {
 getAllAudits,
 getAuditById,
 auditIssues
};