import {
    createTripRow,
    updateTripRowStartDate,
    updateTripRowEndDate,
    deleteTripRow,
    getTripRowByTripId,
    getTripRowsByUserId
} from "../models/TripsModel.js";
import {
    getMapRowsByTripId
} from "../models/MapsModel.js";

export const createTrip = async (req, res, next) => {
    try {
        const { name, user_id, start_date, end_date } = req.body;
        const trip = await createTripRow(name, user_id, start_date, end_date);
        res.status(200).json({
            data: {
                id: trip.insertId,
                name,
                user_id,
                start_date,
                end_date
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Trip' });
    }
}

export const updateTripStartDate = async (req, res, next) => {
    try {
        const { id, start_date } = req.body;
        await updateTripRowStartDate(id, start_date);
        res.status(200).json({
            data: {
                id,
                start_date
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Trip Start Date' });
    }
};

export const updateTripEndDate = async (req, res, next) => {
    try {
        const { id, end_date } = req.body;
        await updateTripRowEndDate(id, end_date);
        res.status(200).json({
            data: {
                id,
                end_date
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Trip End Date' });
    }
}

export const deleteTrip = async (req, res, next) => {
    try {
        const { id } = req.body;
        await deleteTripRow(id);
        res.status(200).json({
            data: {
                id
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Deleting Trip' });
    }
}

export const getTripByTripId = async (req, res, next) => {
    try {
        const { trip_id } = req.params;
        const trip = await getTripRowByTripId(trip_id);
        // const start_date = trip.start_date.toISOString().split('T')[0];
        // const end_date = trip.end_date.toISOString().split('T')[0];
        res.status(200).json({
            data: {
                id: trip.id,
                name: trip.name,
                start_date: trip.start_date,
                end_date: trip.end_date,
                user_id: trip.user_id,
                deleted: trip.deleted
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Getting Trip' });
    }
}

export const getTripsByUserId = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const trips = await getTripRowsByUserId(user_id);
        const tripsWithDates = trips.map(trip => {
            const start_date = trip.start_date.toISOString().split('T')[0];
            const end_date = trip.end_date.toISOString().split('T')[0];
            return {
                id: trip.id,
                name: trip.name,
                start_date,
                end_date,
                user_id: trip.user_id,
                deleted: trip.deleted
            }
        });
        res.status(200).json({
            data: tripsWithDates
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Getting Trips' });
    }
}

export const getTripsAndMapsByUserId = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        let trips = await getTripRowsByUserId(user_id);
        let data = await Promise.all(trips.map(async (trip) => {
            const maps = await getMapRowsByTripId(trip.id);
            // console.log(trip.start_date, trip.end_date);
            // const start_date = trip.start_date.toISOString().split('T')[0];
            // const end_date = trip.end_date.toISOString().split('T')[0];
            // console.log(start_date, end_date);
            return {
                id: trip.id,
                name: trip.name,
                start_date: trip.start_date,
                end_date: trip.end_date,
                maps: maps.map(map => ({
                    id: map.id,
                    location: map.location,
                    name: map.name,
                    // start_date: map.start_date.toISOString().split('T')[0] || null,
                    // end_date: map.end_date.toISOString().split('T')[0] || null,
                    start_date: map.start_date,
                    end_date: map.end_date
                }))
            };
        }));
        res.status(200).json({ data });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Getting Trips' });
    }
};
