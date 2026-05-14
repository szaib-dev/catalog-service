import express from 'express';
import type { Router } from 'express';
import { createProduct, updateProduct } from './controller.js';
// import { CreateProductValidation } from './validation.js';
import WhoCanAccess from '../../middleware/WhoCanAccess.js';
import { UserRole } from '../../types/index.js';
import authenctication from '../../middleware/authenctication.js';
import upload from '../../services/multer.js';

const router: Router = express.Router();

router.post(
    '/create',
    authenctication,
    WhoCanAccess([UserRole.ADMIN, UserRole.MANAGER]),
    // CreateProductValidation,
    upload.single('image'),
    createProduct
);
router.patch(
    '/update/:id',
    authenctication,
    WhoCanAccess([UserRole.ADMIN, UserRole.MANAGER]),
    // CreateProductValidation,
    upload.single('image'),
    updateProduct
);

export default router;
