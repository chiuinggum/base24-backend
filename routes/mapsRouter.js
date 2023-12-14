import express from 'express';
import bodyParser from 'body-parser';
import {
    createMap,
    updateMapName,
    updateMapCenter,
    updateMapZoom,
    deleteMap,
    getMapsByTripId,
    getMapByMapId,
    getMapDatesByMapId
} from "../controllers/MapsController.js";

const mapsRouter = express.Router();   

mapsRouter.use(bodyParser.json());

// create a map (done)
mapsRouter.post('/create', createMap);
// get maps by trip id (done)
mapsRouter.get('/get/:trip_id', getMapsByTripId);
// get a map by id (done)
mapsRouter.get('/:map_id', getMapByMapId);
// update a map's name (odne)
mapsRouter.put('/update/name', updateMapName);
// update a map's center (done)
mapsRouter.put('/update/center', updateMapCenter);
// update a map's zoom (done)
mapsRouter.put('/update/zoom', updateMapZoom);
// delete a map (done)
mapsRouter.put('/delete', deleteMap);

// get dates in between of a map by map id (done)
mapsRouter.get('/get/dates/:map_id', getMapDatesByMapId);

export default mapsRouter;