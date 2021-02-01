import { Router } from "express"
import SessionsController from "@modules/users/infra/http/Controllers/SessionsController"

const sessionRouter = Router();
const sessiosControler = new SessionsController()

sessionRouter.post("/", sessiosControler.create)


export default sessionRouter;
