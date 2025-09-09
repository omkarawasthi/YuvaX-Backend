"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_1 = __importDefault(require("../routes/category"));
var course_1 = __importDefault(require("../routes/course"));
// import demoRoutes from "../routes/demo";
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send("Fisrt screen");
});
app.use(express_1.default.json());
// app.use("/api",authRouter);
app.use("/categories", category_1.default);
app.use("/courses", course_1.default);
// app.use("/demo", demoRoutes);
app.listen(3000, function () {
    console.log("Server Running on port 3000");
});
