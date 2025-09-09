import { Router } from "express";
import {  createCategory, getCategories, getCategoryById } from "../controllers/categoryController";

const router = Router();

router.post("/createcategory", createCategory);
router.get("/getCategories", getCategories);
router.get("/:categoryId", getCategoryById);
// router.put("/updateCategory", updateCategory);
// router.delete("/deleteCategory",deleteCategory)

export default router;