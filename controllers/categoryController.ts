import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    include:{
      courses:true
    }
  });

  if (!categories) {
    return res.status(400).json({
      success: false,
      message: "No category Exists",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Fetched Successfully",
    Categories: categories,
  });
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const categoryIdNumber = Number(categoryId);

    if (isNaN(categoryIdNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category id",
      });
    }

    const getById = await prisma.category.findUnique({
      where: {
        category_id: categoryIdNumber,
      },
      include: { courses: true },
    });

    if (!getById) {
      return res.status(404).json({
        success: false,
        message: "No category Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      Categories: getById,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { category_id, category_name, category_image } = req.body;

  if (!category_id || !category_name || !category_image) {
    return res.status(400).json({
      success: false,
      message: "All fields is required",
    });
  }

  try {
    const existedCategory = await prisma.category.findFirst({
      where: {
        category_id: category_id,
      },
    });

    if (existedCategory) {
      return res.status(400).json({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = await prisma.category.create({
      data: {
        category_id: category_id,
        category_name: category_name,
        category_image: category_image,
      },
    });

    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      Category: category,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.id);

    console.log("udpage category ID: ", categoryId);

    if (isNaN(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category id",
      });
    }

    // req.body can contain any subset of updatable fields
    const updated = await prisma.category.update({
      where: { category_id: categoryId },
      data: req.body,
    });

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
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
        category_id: id,
      },
    });

    if (!existedCategory) {
      return res.status(400).json({
        success: false,
        message: "Category Didn't Exists",
      });
    }

    await prisma.category.delete({
      where: {
        category_id: id,
      },
    });

    return res.status(204).json({
      success: true,
      message: "Category Deleted Successfully",
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
    
  }
};
