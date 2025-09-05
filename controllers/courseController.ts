import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const getDifficultiesByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const difficulties = await prisma.difficulty.findMany({
    where: { courseId: Number(courseId) },
  });
  res.json(difficulties);
};


export const createCourse = async (req: Request, res: Response) => {
  const { name, categoryId } = req.body;

  if (!name || !categoryId) {
    return res.status(400).json({ message: "Course name and categoryId are required" });
  }

  try {
    const course = await prisma.course.create({
      data: {
        name,
        categoryId: Number(categoryId),
      },
    });
    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};