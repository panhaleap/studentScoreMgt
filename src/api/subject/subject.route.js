import { Router } from 'express';
//import { checkCreatedSubject, checkQuerySubject } from './subject.middleware';
import { getSubjectList, createSubject, getSubjectById, updateSubjectById, deleteSubjectById } from './subject.api';

const endpoint = '/subjects/';
const subjectRoute = Router();

subjectRoute.post(endpoint, createSubject);
subjectRoute.get(endpoint, getSubjectList);
subjectRoute.get(`${endpoint}:id`, getSubjectById);
subjectRoute.put(`${endpoint}:id`, updateSubjectById);
subjectRoute.delete(`${endpoint}:id`, deleteSubjectById);

export default subjectRoute;
