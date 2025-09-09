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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var getCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.category.findMany({
                    include: {
                        courses: true
                    }
                })];
            case 1:
                categories = _a.sent();
                if (!categories) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "No category Exists",
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Fetched Successfully",
                        Categories: categories,
                    })];
        }
    });
}); };
exports.getCategories = getCategories;
var getCategoryById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, categoryIdNumber, getById, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                categoryId = req.params.categoryId;
                categoryIdNumber = Number(categoryId);
                if (isNaN(categoryIdNumber)) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Invalid category id",
                        })];
                }
                return [4 /*yield*/, prisma.category.findUnique({
                        where: {
                            category_id: categoryIdNumber,
                        },
                        include: { courses: true },
                    })];
            case 1:
                getById = _a.sent();
                if (!getById) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "No category Exists",
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Fetched Successfully",
                        Categories: getById,
                    })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Internal Server Error",
                        error: error_1.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCategoryById = getCategoryById;
var createCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, category_id, category_name, category_image, existedCategory, category, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, category_id = _a.category_id, category_name = _a.category_name, category_image = _a.category_image;
                if (!category_id || !category_name || !category_image) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "All fields is required",
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.category.findFirst({
                        where: {
                            category_id: category_id,
                        },
                    })];
            case 2:
                existedCategory = _b.sent();
                if (existedCategory) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Category Already Exists",
                        })];
                }
                return [4 /*yield*/, prisma.category.create({
                        data: {
                            category_id: category_id,
                            category_name: category_name,
                            category_image: category_image,
                        },
                    })];
            case 3:
                category = _b.sent();
                res.status(201).json({
                    success: true,
                    message: "Category Created Successfully",
                    Category: category,
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        message: "Internal Server Error",
                        error: error_2.message,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCategory = createCategory;
var updateCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, updated, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                categoryId = Number(req.params.id);
                console.log("udpage category ID: ", categoryId);
                if (isNaN(categoryId)) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Invalid category id",
                        })];
                }
                return [4 /*yield*/, prisma.category.update({
                        where: { category_id: categoryId },
                        data: req.body,
                    })];
            case 1:
                updated = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Category updated successfully",
                        updatedCategory: updated,
                    })];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    error: error_3.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateCategory = updateCategory;
var deleteCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existedCategory, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = Number(req.params.id);
                return [4 /*yield*/, prisma.category.findFirst({
                        where: {
                            category_id: id,
                        },
                    })];
            case 1:
                existedCategory = _a.sent();
                if (!existedCategory) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Category Didn't Exists",
                        })];
                }
                return [4 /*yield*/, prisma.category.delete({
                        where: {
                            category_id: id,
                        },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).json({
                        success: true,
                        message: "Category Deleted Successfully",
                    })];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    error: error_4.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategory = deleteCategory;
