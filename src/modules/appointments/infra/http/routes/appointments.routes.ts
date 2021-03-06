import { Router } from "express"

import ensureAutentication from "@modules/users/infra/http/middlewares/ensureAuthetications";
import AppointmentsControler from "@modules/appointments/infra/http/Controllers/AppointmentsController"
import ProvidersAppointmentsController from '../Controllers/ProvidersAppointmentsController';

const appointmentRouter = Router();
const appointmentController = new AppointmentsControler()
const providersAppointmentsController = new ProvidersAppointmentsController()

import reqChecker from "../../../../../shared/infra/http/celebrate/reqChecker"


// MiddleWare for authentication: The way I am using bellow I whant to express that every thing on this file will have it as middleware
appointmentRouter.use(ensureAutentication)


appointmentRouter.post("/", reqChecker.createAppointment, appointmentController.create)
appointmentRouter.get("/me",providersAppointmentsController.index)


export default appointmentRouter;
