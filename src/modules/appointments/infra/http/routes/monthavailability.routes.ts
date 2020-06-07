import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';

const monthAvailabilityRouter = Router();

monthAvailabilityRouter.use(ensureAuthenticated);

monthAvailabilityRouter.get('/', MonthAvailabilityController.index);

export default monthAvailabilityRouter;
