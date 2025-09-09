import { Router } from "express";
import { getDifficultiesByCourse, createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from "../controllers/courseController";

const router = Router();

router.get("/:courseId/difficulties", getDifficultiesByCourse);
router.post("/createcourse", createCourse);
router.get("/", getCourses);            // READ ALL
router.get("/:courseId", getCourseById); // READ ONE
router.put("/:courseId", updateCourse);  // UPDATE
router.delete("/:courseId", deleteCourse);


export default router;
