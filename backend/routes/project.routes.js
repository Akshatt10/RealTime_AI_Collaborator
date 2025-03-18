import {Router} from 'express';
import { body } from 'express-validator';
import * as projectController from '../controllers/Project.controller.js';
import * as auth from '../middlewares/auth.middleware.js';

const router = Router();


router.post('/create',
    auth.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
);

export default router;
