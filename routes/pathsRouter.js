import express from 'express';
import bodyParser from 'body-parser';
import {
    createPath,
    updatePathInfo,
    deletePath,
    getPathsByMapId
} from "../controllers/PathsController.js";

const pathsRouter = express.Router();

pathsRouter.use(bodyParser.json());

// create a path (done)
pathsRouter.post('/create', createPath);
// get paths of a map
pathsRouter.get('/get/:map_id', getPathsByMapId);
// update a path's info (not tested)
pathsRouter.put('/update/info', updatePathInfo);
// delete a path (done)
pathsRouter.put('/delete', deletePath);

export default pathsRouter;