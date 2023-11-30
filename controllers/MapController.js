import {
    createMapRow,
} from "../models/MapModel.js";

export const createMap = async (req, res, next) => {
    try {
        const { name, user_id, lat, lng } = req.body;
        const map = await createMapRow(name, user_id, lat, lng);
        res.status(200).json({
            data: {
                id: map.insertId,
                name,
                user_id,
                lat,
                lng
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Map' });
    }
}