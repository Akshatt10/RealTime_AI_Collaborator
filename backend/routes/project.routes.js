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

router.get('/all',
    auth.authUser,
    projectController.getAllProjects
);

router.put('/add-user',
    auth.authUser, 
    body('projectId').isString().withMessage('Project ID must be a string'),
    body('users').isArray({ min: 1 }).withMessage('Users must be a non-empty array')
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    projectController.addUserToProject
)

router.get('/get-project/:projectId',
    auth.authUser,   
    projectController.getProjectById
)

export default router;
