import express from 'express';
import bodyParser from 'body-parser';
import {
    updateDateMarkers,
    getDatesByMarkerId
} from "../controllers/DatesController.js";

const datesRouter = express.Router();

datesRouter.use(bodyParser.json());

// create a date's paths (done)
// datesRouter.post('/create/paths', createDatePath);
// create a date's markers (done)
// datesRouter.post('/create/markers', createDateMarker);
// delete a date's paths (done)
// datesRouter.put('/delete/paths', deleteDatePath);
// delete a date's markers (done)
// datesRouter.put('/delete/markers', deleteDateMarker);
// delete a date (done)

// update markers dates (not tested)
datesRouter.put('/update/markers', updateDateMarkers)

// get marker dates by marker id 
datesRouter.get('/get/marker/:marker_id', getDatesByMarkerId);

export default datesRouter;