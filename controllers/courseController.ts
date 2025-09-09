import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
  const {
    course_name,
    category_id,
    course_description,
    course_content,
    difficulty,
    course_duration,
    actual_price,
    discounted_price,
    language,
    total_lesson,
    class_type,
    max_age
  } = req.body;

  if (!course_name || !category_id || !difficulty || !course_duration || !actual_price || !language || !total_lesson || !class_type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const course = await prisma.course.create({
      data: {
        course_name,
        category_id: Number(category_id),
        course_description,
        course_content,
        difficulty,
        course_duration,
        actual_price: parseFloat(actual_price),
        discounted_price: discounted_price ? parseFloat(discounted_price) : undefined,
        language,
        total_lesson: Number(total_lesson),
        class_type,
        max_age,
      },
    });
    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

// Get all courses
export const getCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        category: true,
        modules: true,
      },
    });
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

// Get course by ID
export const getCourseById = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { course_id: courseId },
      include: {
        category: true,
        modules: true,
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
};

// Update course by ID
export const updateCourse = async (req: Request, res: Response) => {
  

  try {
     const { courseId } = req.params;
  const {
    course_name,
    category_id,
    course_description,
    course_content,
    difficulty,
    course_duration,
    actual_price,
    discounted_price,
    language,
    total_lesson,
    class_type,
    max_age
  } = req.body;
    // Check if the course exists
    const existingCourse = await prisma.course.findUnique({
      where: { course_id: courseId },
    });

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    

    const course = await prisma.course.update({
      where: { course_id: courseId },
      data: {
        course_name,
        category_id: category_id ? Number(category_id) : undefined,
        course_description,
        course_content,
        difficulty,
        course_duration,
        actual_price: actual_price ? parseFloat(actual_price) : undefined,
        discounted_price: discounted_price ? parseFloat(discounted_price) : undefined,
        language,
        total_lesson: total_lesson ? Number(total_lesson) : undefined,
        class_type,
        max_age,
      },
    });

    res.json(course);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

// Delete course by ID
export const deleteCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    // Check if the course exists before attempting delete
    const existingCourse = await prisma.course.findUnique({
      where: { course_id: courseId },
    });

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Proceed to delete only if the course exists
    await prisma.course.delete({
      where: { course_id: courseId },
    });

    res.json({ message: "Course deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};
