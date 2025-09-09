import express, {Express, Request, Response} from "express"
import categoryRoutes from "../routes/category";

const app:Express = express()


app.get('/',(req:Request,res:Response) =>{
    res.send("Fisrt screen");
})

app.use(express.json());
// app.use("/api",authRouter);
app.use("/categories", categoryRoutes);
// app.use("/courses", courseRoutes);
// app.use("/demo", demoRoutes)

app.listen(3000,()=>{
    console.log(`Server Running on port 3000`)
})