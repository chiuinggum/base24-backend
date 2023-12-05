import {
    createMapRow,
    getMapRowById
} from "../models/MapModel.js";

export const createMap = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const { name, lat, lng } = req.body;
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
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Map' });
    }
};

export const getMap = async (req, res, next) => {
    try {
        const { id } = req.params;
        const map = await getMapRowById(id);
        res.status(200).json({ data: map });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Getting Map' });
    }
};