import { Router } from "express";
import {  createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController";

const router = Router();

router.post("/createcategory", createCategory);
router.get("/getCategories", getCategories);
router.get("/:categoryId", getCategoryById);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id",deleteCategory);

export default router;