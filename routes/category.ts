import { Router } from "express";
import { getCategories, getCoursesByCategory, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";

const router = Router();

router.get("/", getCategories);
router.get("/:categoryId/courses", getCoursesByCategory);
router.post("/createcategory", createCategory);
router.put("/updateCategory", updateCategory);
router.delete("/deleteCategory",deleteCategory)

export default router;