// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// export const signup = async (req: Request, res: Response) => {
//   try {
//     console.log(req.body);
//     const { name, email, password } = req.body;

//     const existingUser = await prisma.user.findFirst({ where: { email } });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User alredy exists",
//       });
//     }

//     const hashedpassword = await bcrypt.hash(password, 10);

//     const User = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedpassword,
//       },
//     });

//     return res.status(200).json({
//       success: true,
//       message: "User Created successfully",
//       User: User,
//     });
//   } catch (error) {
//     console.log("Internal Server Error", error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const user = await prisma.user.findFirst({
//       where: { email: email },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not Registered.",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "password is incorrect",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User Login successfully",
//     });
//   } catch (error) {
//     console.log("Internal Sever Error", error.message);
//   }
// };




