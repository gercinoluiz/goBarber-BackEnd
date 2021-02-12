import { Router } from 'express';
import ensureAutentication from '../middlewares/ensureAuthetications';
import ProfileController from '../Controllers/ProfileController';



const profileRouter = Router();
const profileController = new ProfileController();


//TODO: Very Important
profileRouter.use(ensureAutentication);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
