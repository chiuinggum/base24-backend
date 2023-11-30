import express from 'express';
import bodyParser from 'body-parser';
import {
    createMap
} from '../controllers/MapController.js';

const mapRouter = express.Router();

mapRouter.use(bodyParser.json());
mapRouter.post('/create', createMap);

export default mapRouter;