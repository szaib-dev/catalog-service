import express from 'express';
import type { Router } from 'express';
import { createCategory } from './controller.js';
import categoryValidation from './validator.js';
import authenctication from '../middleware/authenctication.js';
import WhoCanAccess from '../middleware/WhoCanAccess.js';
import { UserRole } from '../types/index.js';

const router: Router = express.Router();

router.post(
    '/create',
    authenctication,
    WhoCanAccess([UserRole.ADMIN]),
    categoryValidation,
    createCategory
);

export default router;
