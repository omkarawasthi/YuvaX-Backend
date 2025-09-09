"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getCourses = exports.createCourse = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
// Create a new course
var createCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, course_name, category_id, course_description, course_content, difficulty, course_duration, actual_price, discounted_price, language, total_lesson, class_type, max_age, course, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, course_name = _a.course_name, category_id = _a.category_id, course_description = _a.course_description, course_content = _a.course_content, difficulty = _a.difficulty, course_duration = _a.course_duration, actual_price = _a.actual_price, discounted_price = _a.discounted_price, language = _a.language, total_lesson = _a.total_lesson, class_type = _a.class_type, max_age = _a.max_age;
                if (!course_name || !category_id || !difficulty || !course_duration || !actual_price || !language || !total_lesson || !class_type) {
                    return [2 /*return*/, res.status(400).json({ message: "Missing required fields" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.course.create({
                        data: {
                            course_name: course_name,
                            category_id: Number(category_id),
                            course_description: course_description,
                            course_content: course_content,
                            difficulty: difficulty,
                            course_duration: course_duration,
                            actual_price: parseFloat(actual_price),
                            discounted_price: discounted_price ? parseFloat(discounted_price) : undefined,
                            language: language,
                            total_lesson: Number(total_lesson),
                            class_type: class_type,
                            max_age: max_age,
                        },
                    })];
            case 2:
                course = _b.sent();
                res.status(201).json(course);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ message: "Error creating course", error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCourse = createCourse;
// Get all courses
var getCourses = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courses, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.course.findMany({
                        include: {
                            category: true,
                            modules: true,
                        },
                    })];
            case 1:
                courses = _a.sent();
                res.json(courses);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: "Error fetching courses", error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCourses = getCourses;
// Get course by ID
var getCourseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, course, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseId = req.params.courseId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.course.findUnique({
                        where: { course_id: courseId },
                        include: {
                            category: true,
                            modules: true,
                        },
                    })];
            case 2:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ message: "Course not found" })];
                }
                res.json(course);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ message: "Error fetching course", error: error_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCourseById = getCourseById;
// Update course by ID
var updateCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, _a, course_name, category_id, course_description, course_content, difficulty, course_duration, actual_price, discounted_price, language, total_lesson, class_type, max_age, existingCourse, course, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                courseId = req.params.courseId;
                _a = req.body, course_name = _a.course_name, category_id = _a.category_id, course_description = _a.course_description, course_content = _a.course_content, difficulty = _a.difficulty, course_duration = _a.course_duration, actual_price = _a.actual_price, discounted_price = _a.discounted_price, language = _a.language, total_lesson = _a.total_lesson, class_type = _a.class_type, max_age = _a.max_age;
                return [4 /*yield*/, prisma.course.findUnique({
                        where: { course_id: courseId },
                    })];
            case 1:
                existingCourse = _b.sent();
                if (!existingCourse) {
                    return [2 /*return*/, res.status(404).json({ message: "Course not found" })];
                }
                return [4 /*yield*/, prisma.course.update({
                        where: { course_id: courseId },
                        data: {
                            course_name: course_name,
                            category_id: category_id ? Number(category_id) : undefined,
                            course_description: course_description,
                            course_content: course_content,
                            difficulty: difficulty,
                            course_duration: course_duration,
                            actual_price: actual_price ? parseFloat(actual_price) : undefined,
                            discounted_price: discounted_price ? parseFloat(discounted_price) : undefined,
                            language: language,
                            total_lesson: total_lesson ? Number(total_lesson) : undefined,
                            class_type: class_type,
                            max_age: max_age,
                        },
                    })];
            case 2:
                course = _b.sent();
                res.json(course);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                res.status(500).json({ message: "Error updating course", error: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateCourse = updateCourse;
// Delete course by ID
var deleteCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, existingCourse, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseId = req.params.courseId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.course.findUnique({
                        where: { course_id: courseId },
                    })];
            case 2:
                existingCourse = _a.sent();
                if (!existingCourse) {
                    return [2 /*return*/, res.status(404).json({ message: "Course not found" })];
                }
                // Proceed to delete only if the course exists
                return [4 /*yield*/, prisma.course.delete({
                        where: { course_id: courseId },
                    })];
            case 3:
                // Proceed to delete only if the course exists
                _a.sent();
                res.json({ message: "Course deleted successfully" });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                res.status(500).json({ message: "Error deleting course", error: error_5.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteCourse = deleteCourse;
