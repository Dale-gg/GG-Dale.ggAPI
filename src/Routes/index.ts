import { Router } from 'express';

import summoners from './summoners.routes';

const routes = Router();

routes.use('/summoners', summoners);

export default routes;
