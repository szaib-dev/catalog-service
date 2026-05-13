import express from 'express';
import type { Router } from 'express';
import {
    createCategory,
    deleteCategory,
    findCategoryById,
    listCategory,
    updateCategory,
} from './controller.js';
import authenctication from '../middleware/authenctication.js';
import WhoCanAccess from '../middleware/WhoCanAccess.js';
import { UserRole } from '../types/index.js';
import { RegisterValidation, UpdateValidation } from './validator.js';

const router: Router = express.Router();

router.post(
    '/create',
    authenctication,
    WhoCanAccess([UserRole.ADMIN]),
    RegisterValidation,
    createCategory
);
router.get('/list', listCategory);
router.get('/list/:id', findCategoryById);
router.patch(
    '/update/:id',
    authenctication,
    WhoCanAccess([UserRole.ADMIN]),
    UpdateValidation,
    updateCategory
);
router.delete(
    '/delete/:id',
    authenctication,
    WhoCanAccess([UserRole.ADMIN]),
    deleteCategory
);

export default router;
