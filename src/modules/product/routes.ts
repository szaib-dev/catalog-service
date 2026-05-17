import express from 'express';
import type { Router } from 'express';
import {
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
} from './controller.js';
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

//todo: only that manager should be able to update this product if he belongs to same tenant

router.patch(
    '/update/:id',
    authenctication,
    WhoCanAccess([UserRole.ADMIN, UserRole.MANAGER]),
    // CreateProductValidation,
    upload.single('image'),
    updateProduct
);

router.get('/:id', getProduct);

//todo: only that manager should be able to delete this product if he belongs to same tenant

router.delete(
    'delete/:id',
    authenctication,
    WhoCanAccess([UserRole.ADMIN, UserRole.MANAGER]),
    deleteProduct
);

export default router;
