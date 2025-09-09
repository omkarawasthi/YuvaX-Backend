// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";


// const prisma = new PrismaClient();

// export const getDifficultiesByCourse = async (req: Request, res: Response) => {
//   const { courseId } = req.params;
//   const difficulties = await prisma.difficulty.findMany({
//     where: { courseId: Number(courseId) },
//   });
//   res.json(difficulties);
// };


// export const createCourse = async (req: Request, res: Response) => {
//   const { name, categoryId } = req.body;

//   if (!name || !categoryId) {
//     return res.status(400).json({ message: "Course name and categoryId are required" });
//   }

//   try {
//     const course = await prisma.course.create({
//       data: {
//         name,
//         categoryId: Number(categoryId),
//       },
//     });
//     res.status(201).json(course);
//   } catch (error: any) {
//     res.status(500).json({ message: "Error creating course", error: error.message });
//   }
// };


// export const getCourses = async (_req: Request, res: Response) => {
//   try {
//     const courses = await prisma.course.findMany({
//       include: {
//         category: true,
//         difficulties: true,
//         demos: true,
//       },
//     });
//     res.json(courses);
//   } catch (error: any) {
//     res.status(500).json({ message: "Error fetching courses", error: error.message });
//   }
// };



// export const getCourseById = async (req: Request, res: Response) => {
//   const { courseId } = req.params;

//   try {
//     const course = await prisma.course.findUnique({
//       where: { id: Number(courseId) },
//       include: {
//         category: true,
//         difficulties: true,
//         demos: true,
//       },
//     });

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.json(course);
//   } catch (error: any) {
//     res.status(500).json({ message: "Error fetching course", error: error.message });
//   }
// };



// export const updateCourse = async (req: Request, res: Response) => {
//   const { courseId } = req.params;
//   const { name, categoryId } = req.body;

//   try {
//     const course = await prisma.course.update({
//       where: { id: Number(courseId) },
//       data: {
//         name,
//         categoryId: categoryId ? Number(categoryId) : undefined,
//       },
//     });

//     res.json(course);
//   } catch (error: any) {
//     res.status(500).json({ message: "Error updating course", error: error.message });
//   }
// };




// export const deleteCourse = async (req: Request, res: Response) => {
//   const { courseId } = req.params;

//   try {
//     await prisma.course.delete({
//       where: { id: Number(courseId) },
//     });

//     res.json({ message: "Course deleted successfully" });
//   } catch (error: any) {
//     res.status(500).json({ message: "Error deleting course", error: error.message });
//   }
// };