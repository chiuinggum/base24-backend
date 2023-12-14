import express from 'express';
import bodyParser from 'body-parser';
import {
    createMapPath,
    updateMapPathInfo,
    deleteMapPath
} from "../controllers/MapPathsController.js";

const mapPathsRouter = express.Router();

mapPathsRouter.use(bodyParser.json());

// create a map path (done)
mapPathsRouter.post('/create', createMapPath);
// get a map path
mapPathsRouter.get('/get');
// update a map path's info (not tested)
mapPathsRouter.put('/update/info', updateMapPathInfo);
// delete a map path (done)
mapPathsRouter.put('/delete', deleteMapPath);

export default mapPathsRouter;