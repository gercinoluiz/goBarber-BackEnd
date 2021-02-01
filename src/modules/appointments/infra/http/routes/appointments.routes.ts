import { Router } from "express"

import ensureAutentication from "@modules/users/infra/http/middlewares/ensureAuthetications";
import AppointmentsControler from "@modules/appointments/infra/http/Controllers/AppointmentsController"

const appointmentRouter = Router();
const appointmentController = new AppointmentsControler


// MiddleWare for authentication: The way I am using bellow I whant to express that every thing on this file will have it as middleware
appointmentRouter.use(ensureAutentication)

// appointmentRouter.get("/", async (request, response) => {

//     const appointments = await appointmentsRepository.find()

//     return response.json(appointments)
// })

appointmentRouter.post("/",appointmentController.create)


export default appointmentRouter;
