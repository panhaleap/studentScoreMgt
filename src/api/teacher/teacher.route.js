import { Router } from 'express';
//import { checkCreatedSubject, checkQuerySubject } from './subject.middleware';
import { createTeacher, getTeacherList, getTeacherById, updateTeacherById, deleteTeacherById } from './teacher.api';

const endpoint = '/teachers/';
const teacherRoute = Router();

teacherRoute.post(endpoint, createTeacher);
teacherRoute.get(endpoint, getTeacherList);
teacherRoute.get(`${endpoint}:id`, getTeacherById);
teacherRoute.put(`${endpoint}:id`, updateTeacherById);
teacherRoute.delete(`${endpoint}:id`, deleteTeacherById);

export default teacherRoute;
