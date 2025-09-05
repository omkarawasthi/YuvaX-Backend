import { Router } from "express";
import { getDifficultiesByCourse, createCourse } from "../controllers/courseController";

const router = Router();

router.get("/:courseId/difficulties", getDifficultiesByCourse);
router.post("/createcourse", createCourse);
export default router;
