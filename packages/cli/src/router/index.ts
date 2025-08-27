import express, { Router } from "express";

import { saveAll } from "../routes";

const router: Router = express.Router();

/**
 * 保存整个表单
 */
router.post("/saveAll", saveAll);

export default router;
