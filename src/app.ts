import morgan from "morgan";
import express from 'express';
import cors from "cors";
import MainRouter from "./mainRouter";
import { errorHandler } from "./common/middleware/error.middleware";
import uploadImage from "./common/middleware/fileupload.middleware";


const pokharaRental = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan("dev"));
    app.use("/api", MainRouter);
    app.post("/test", uploadImage(), ()=>{console.log("done")})
    app.use(errorHandler);
    return app;
  };
  
  export default pokharaRental;