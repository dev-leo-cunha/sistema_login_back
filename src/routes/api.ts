import { Router } from 'express';
import  {Auth}  from '../middlewares/auth';

import * as ApiController from '../controllers/apiController';

const router = Router()
// definindo o nome das rotas e mandando pro ApiController
router.get('/ping', ApiController.ping)
router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
router.post('/access', Auth.private, ApiController.access);

export default router;