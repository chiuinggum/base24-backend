import {
    createMapPathRow,
    updateMapPathRowInfo,
    deleteMapPathRow
} from "../models/MapPathsModel.js";

export const createMapPath = async (req, res, next) => {
    try {
        const { trip_id, start_map_id, end_map_id } = req.body;
        const mapPath = await createMapPathRow(trip_id, start_map_id, end_map_id);
        res.status(200).json({
            data: {
                id: mapPath.insertId,
                trip_id,
                start_map_id,
                end_map_id
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Map Path' });
    }
}

export const updateMapPathInfo = async (req, res, next) => {
    try {
        const { id, info } = req.body;
        await updateMapPathRowInfo(id, info);
        res.status(200).json({
            data: {
                id,
                info
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Map Path Info' });
    }
}

export const deleteMapPath = async (req, res, next) => {
    try {
        const { id } = req.body;
        await deleteMapPathRow(id);
        res.status(200).json({
            data: {
                id
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Deleting Map Path' });
    }
}