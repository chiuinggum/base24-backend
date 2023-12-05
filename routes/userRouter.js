import express from 'express';
import bodyParser from 'body-parser';

import { contentType } from '../services/checkHeaders.js';
import {
    checkRegex, 
    confirmPassword, 
    hashPassword
} from '../services/handleSensitiveData.js';
import {
    checkSignUpFields,
    isUsernameTaken,
    isEmailTaken,
    signUp,
    identifyInput,
    signIn
} from '../controllers/userController.js';

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());
usersRouter.post(
    '/signup',
    contentType,
    checkSignUpFields,
    checkRegex,
    isUsernameTaken,
    isEmailTaken,
    confirmPassword,
    hashPassword,
    signUp
);
usersRouter.post('/signin', identifyInput, signIn);

export default usersRouter;