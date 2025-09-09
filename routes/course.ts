import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from "../controllers/courseController";


const router = Router();

router.post("/createcourse", createCourse);
router.get("/", getCourses);
router.get("/:courseId", getCourseById);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);



export default router;
