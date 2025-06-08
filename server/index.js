import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js'
import  dbconnect  from './utils/dbconnect.js';
import { errorHandler,routeNotFound } from "./middlewares/errorMiddleWare.js";
import {startTwitterScheduler} from './controllers/twittercontroller.js';
dotenv.config()
dbconnect();

const port=process.env.PORT || 5000;

const app=express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
// {
//     origin:['http://localhost:3000',"http..localhost:3001"],
//     methods:["GET","POST","PUT","DELETE"],
//     credentials:true,

// }
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// app.use(morgan('dev'));
app.use("/api",routes);


app.use(routeNotFound)
app.use(errorHandler)
//startTwitterScheduler();
app.listen(port,()=>{
    console.log(`Listening on port ${port} `);
})


