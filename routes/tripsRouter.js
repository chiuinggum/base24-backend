import express from 'express';
import bodyParser from 'body-parser';
import {
    createTrip,
    updateTripStartDate,
    updateTripEndDate,
    deleteTrip,
    getTripByTripId,
    getTripsByUserId,
    getTripsAndMapsByUserId
} from '../controllers/TripsController.js';


const tripsRouter = express.Router();

tripsRouter.use(bodyParser.json());

// create a trip (done)
tripsRouter.post('/create', createTrip);
// get trip by id (done)
tripsRouter.get('/get/:trip_id', getTripByTripId);
// get all trips by user id (done)
tripsRouter.get('/get/all/:user_id', getTripsByUserId);
// get all trips and maps by user id (dpne)
tripsRouter.get('/:user_id', getTripsAndMapsByUserId);
// update a trip's start date (done)
tripsRouter.put('/update/start_date', updateTripStartDate);
// update a trip's end date (done)
tripsRouter.put('/update/end_date', updateTripEndDate);
// delete a trip (done)
tripsRouter.put('/delete', deleteTrip);

export default tripsRouter;