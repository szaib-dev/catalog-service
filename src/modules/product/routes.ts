import express from 'express';
import type { Router } from 'express';
import { createProduct } from './controller.js';
import { CreateProductValidation } from './validation.js';
import WhoCanAccess from '../../middleware/WhoCanAccess.js';
import { UserRole } from '../../types/index.js';
import authenctication from '../../middleware/authenctication.js';

const router: Router = express.Router();

router.post(
    '/create',
    authenctication,
    WhoCanAccess([UserRole.ADMIN, UserRole.MANAGER]),
    CreateProductValidation,
    createProduct
);

export default router;
