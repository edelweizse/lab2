import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getTasks, createTask, deleteTask, updateTask } from "../controllers/taskController.js";
const router = express.Router();

router.get('/todos', verifyToken,  getTasks);
router.post('/todos', verifyToken, createTask);
router.delete('/todos/:id', verifyToken, deleteTask);
router.put('/todos/:id', verifyToken, updateTask);

export default router;