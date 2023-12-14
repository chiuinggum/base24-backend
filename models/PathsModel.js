import dbConfig from "../config/dbConfig.js";
const { db } = dbConfig;

export const createPathRow = async (map_id, start_marker_id, end_marker_id) => {
    try {
        const [pathRow] = await db.query('INSERT INTO paths (map_id, start_marker_id, end_marker_id) VALUES (?, ?, ?)', [map_id, start_marker_id, end_marker_id]);
        console.log(`path created with id ${pathRow.insertId}`);
        return pathRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updatePathRowInfo = async (id, info) => {
    try {
        await db.query('UPDATE paths SET info = ? WHERE id = ?', [info, id]);
        console.log(`path ${id} updated with info ${info}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deletePathRow = async (id) => {
    try {
        await db.query('UPDATE paths SET deleted = ? WHERE id = ?', [1, id]);
        console.log(`path ${id} deleted`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getPathRowsByMapId = async (map_id) => {
    try {
        const [pathRows] = await db.query('SELECT * FROM paths WHERE map_id = ? AND deleted = ?', [map_id, 0]);
        console.log(`paths of map ${map_id} retrieved`);
        return pathRows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}