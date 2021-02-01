import express, { json } from "express";
import 'express-async-errors'  // It must be right inside express importing
import 'reflect-metadata'
import "@shared/infra/typeorm"  // the code like this calls the code insede the file without the need of an export

import "@shared/container"

import routes from "@shared/infra/http/routes"
import morgan from "morgan"
import uploadConfig from "@config/upload"

import globalErrorHandler from "@shared/errors/globalErrorHandler";
import cors from "cors"


const app = express();

app.use(morgan('dev'))

app.use(express.json())

app.use(cors())
app.use(routes)


app.use(globalErrorHandler) // must be after the routes
app.use('/files', express.static(uploadConfig.uploadFolder))

// src/server.ts

app.listen(3333, () => {
    console.log("SERVER STARTED ON PORT 3333!");
});
