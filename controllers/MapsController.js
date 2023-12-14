import {
    createMapRow,
    updateMapRowName,
    updateMapRowCenter,
    updateMapRowZoom,
    deleteMapRow,
    getMapRowsByTripId,
    getMapRowByMapId
} from "../models/MapsModel.js";

export const createMap = async (req, res, next) => {
    try {
        const { trip_id, location, center_lat, center_lng, name, start_date, end_date } = req.body;
        const map = await createMapRow(trip_id, location, center_lat, center_lng, name, start_date, end_date);
        res.status(200).json({
            data: {
                id: map.insertId,
                trip_id,
                location,
                center_lat,
                center_lng,
                name,
                start_date,
                end_date
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Map' });
    }
}

export const updateMapName = async (req, res, next) => {
    try {
        const { id, name } = req.body;
        await updateMapRowName(id, name);
        res.status(200).json({
            data: {
                id,
                name
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Map Name' });
    }
}

export const updateMapCenter = async (req, res, next) => {
    try {
        const { id, center_lat, center_lng } = req.body;
        await updateMapRowCenter(id, center_lat, center_lng);
        res.status(200).json({
            data: {
                id,
                center_lat,
                center_lng
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Map Center' });
    }
}

export const updateMapZoom = async (req, res, next) => {
    try {
        const { id, zoom } = req.body;
        await updateMapRowZoom(id, zoom);
        res.status(200).json({
            data: {
                id,
                zoom
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Map Zoom' });
    }
}

export const deleteMap = async (req, res, next) => {
    try {
        const { id } = req.body;
        await deleteMapRow(id);
        res.status(200).json({
            data: {
                id
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Deleting Map' });
    }
}

export const getMapsByTripId = async (req, res, next) => {
    try {
        const { trip_id } = req.params;
        let maps = await getMapRowsByTripId(trip_id);
        maps.forEach(map => {
            map.start_date = map.start_date.toISOString().split('T')[0];
            map.end_date = map.end_date.toISOString().split('T')[0];
        });
        res.status(200).json({
            data: maps
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Retrieving Maps' });
    }
}

export const getMapByMapId = async (req, res, next) => {
    try {
        const { map_id } = req.params;
        const map = await getMapRowByMapId(map_id);
        res.status(200).json({
            data: map
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Retrieving Map' });
    }
}

export const getMapDatesByMapId = async (req, res, next) => {
    try {
        const { map_id } = req.params;
        const map = await getMapRowByMapId(map_id);
        console.log(map);
        const curr_date = new Date(map.start_date);
        const end_date = new Date(map.end_date);
        let dates = [];
        while (curr_date <= end_date) {
            dates.push(curr_date.toISOString().split('T')[0]);
            curr_date.setDate(curr_date.getDate() + 1);
        }
        res.status(200).json({
            data: dates
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Retrieving Map Dates' });
    }
}