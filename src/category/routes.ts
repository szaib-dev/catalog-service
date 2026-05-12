import express from "express"
import type {Router} from "express"
import { createCategory } from "./controller.js";


const router: Router = express.Router();

router.post('/create', createCategory)