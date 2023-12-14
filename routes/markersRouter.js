import express from 'express';
import bodyParser from 'body-parser';
import {
    createMarker,
    updateMarkerName,
    updateMarkerInfo,
    updateMarkerPlaceTag,
    deleteMarker,
    getMarkersByMapId
} from "../controllers/MarkersController.js";

const markersRouter = express.Router();

markersRouter.use(bodyParser.json());

// create a marker (done)
markersRouter.post('/create', createMarker);
// get all markers of a map (done)
markersRouter.get('/get/:map_id', getMarkersByMapId);
// get marker by marker id
// markersRouter.get('/:marker_id', )
// update a marker's name (done)
markersRouter.put('/update/name', updateMarkerName);
// update a marker's info (done)
markersRouter.put('/update/info', updateMarkerInfo);
// update a marker's place tag (done)
markersRouter.put('/update/place_tag', updateMarkerPlaceTag);
// delete a marker (done)
markersRouter.put('/delete', deleteMarker);

export default markersRouter;