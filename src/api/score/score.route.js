import { Router } from 'express';
//import { checkCreatedSubject, checkQuerySubject } from './subject.middleware';
import { createScore, getScoretList, getScoreById, updateScoreById, deleteScoreById } from './score.api';

const endpoint = '/scores/';
const scoreRoute = Router();

scoreRoute.post(endpoint, createScore);
scoreRoute.get(endpoint, getScoretList);
scoreRoute.get(`${endpoint}:id`, getScoreById);
scoreRoute.put(`${endpoint}:id`, updateScoreById);
scoreRoute.delete(`${endpoint}:id`, deleteScoreById);

export default scoreRoute;
