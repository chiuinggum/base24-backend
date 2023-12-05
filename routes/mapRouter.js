import express from 'express';
import bodyParser from 'body-parser';
import {
    createMap,
    getMap
} from '../controllers/MapController.js';
import {
    authorization,
    authorizationVerifyToken
} from '../services/checkHeaders.js';

const mapRouter = express.Router();

mapRouter.use(bodyParser.json());
mapRouter.post('/create', authorization, authorizationVerifyToken, createMap);
mapRouter.get('/:id', getMap);

export default mapRouter;