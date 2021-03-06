import { Router } from 'express';
import ProvidersControler from '../../../../users/infra/http/Controllers/ProvidersController';
import ProviderMonthAlailabilityController from '../Controllers/ProviderMonthAvailabilityController';
import ProviderDayAlailabilityController from '../Controllers/ProviderDayAvalabilityController';
import ensureAutentication  from '@modules/users/infra/http/middlewares/ensureAuthetications';
import reqChecker from '../../../../../shared/infra/http/celebrate/reqChecker';

const providersRouter = Router();

const providersController = new ProvidersControler();
const providerMonthAvailabilityController = new ProviderMonthAlailabilityController();
const providerDayAvailabilityController = new ProviderDayAlailabilityController();

providersRouter.use(ensureAutentication);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability', reqChecker.provider_id,
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability', reqChecker.provider_id,
  providerDayAvailabilityController.index,
);

export default providersRouter
