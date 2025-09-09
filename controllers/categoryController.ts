import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  if (!categories) {
    return res.status(400).json({
      success: false,
      message: "No category Exists",
    });
  }
  return res.status(400).json({
    success: true,
    message: "Fetched Successfully",
    Categories: categories,
  });
};

export const getCoursesByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const courses = await prisma.course.findMany({
    where: { categoryId: Number(categoryId) },
  });
  res.json(courses);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  try {
    const existedCategory = await prisma.category.findFirst({
      where: {
        name: name,
      },
    });

    if (existedCategory) {
      return res.status(400).json({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      Category: category,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error creating category",
      error: error.message,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const updated = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return res.status(400).json({
      success: false,
      message: "Category name is required",
      updatedCategory: updated,
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existedCategory = await prisma.category.findFirst({
      where: {
        id: id,
      },
    });

    if (!existedCategory) {
      return res.status(400).json({
        success: false,
        message: "Category Didn't Exists",
      });
    }

    await prisma.category.delete({ where: { id } });

    res.status(204).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
