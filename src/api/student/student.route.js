import { Router } from 'express';
import { checkCreatedStudent, checkQueryStudent } from './student.middleware';
import { getStudentList, createStudent, getStudentById, updateStudentById, deleteStudentById, createScoresForStudentById } from './student.api';

const endpoint = '/students/';
const studentRoute = Router();

//studentRoute.post(endpoint, checkCreatedStudent, createStudent);
studentRoute.post(endpoint, createStudent);
// studentRoute.get(endpoint, checkQueryStudent, getStudentList);
studentRoute.get(endpoint, getStudentList);
studentRoute.get(`${endpoint}:id`, getStudentById);
studentRoute.put(`${endpoint}:id`, updateStudentById);
studentRoute.delete(`${endpoint}:id`, deleteStudentById);

studentRoute.post(`${endpoint}:id/scores`, createScoresForStudentById);


export default studentRoute;
