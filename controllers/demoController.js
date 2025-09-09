// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export const requestDemo = async (req: Request, res: Response) => {
//   const { categoryId, courseId, difficultyId, slot } = req.body;
//   const demo = await prisma.demoRequest.create({
//     data: {
//       categoryId,
//       courseId,
//       difficultyId,
//       slot,
//     },
//   });
//   res.status(201).json(demo);
// };
// export const getDemoDetails = async (req: Request, res: Response) => {
//   const { demoId } = req.params;
//   const demo = await prisma.demoRequest.findUnique({
//     where: { id: Number(demoId) },
//     include: {
//       category: true,
//       course: true,
//       difficulty: true,
//     },
//   });
//   if (!demo) {
//     return res.status(404).json({ message: "Demo not found" });
//   }
//   res.json(demo);
// };
