import dbConfig from "../config/dbConfig.js";
const { db } = dbConfig;

export const createMapPathRow = async (trip_id, start_map_id, end_map_id) => {
    try {
        const [mapPathRow] = await db.query('INSERT INTO map_paths (trip_id, start_map_id, end_map_id) VALUES (?, ?, ?)', [trip_id, start_map_id, end_map_id]);
        console.log(`map path created with id ${mapPathRow.insertId}`);
        return mapPathRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateMapPathRowInfo = async (id, info) => {
    try {
        await db.query('UPDATE map_paths SET info = ? WHERE id = ?', [info, id]);
        console.log(`map path ${id} updated with info ${info}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteMapPathRow = async (id) => {
    try {
        await db.query('UPDATE map_paths SET deleted = ? WHERE id = ?', [1, id]);
        console.log(`map path ${id} deleted`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}