import { Router } from 'express';
import UserController from '../controllers/UserController';
import LoginValidation from '../middlewares/loginValidations';

const route = Router();
const userController = new UserController();

const loginValidation = new LoginValidation();

route.post('/', loginValidation.loginV, userController.login);
route.get('/validate', userController.validate);

export default route;
