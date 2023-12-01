import dbConfig from "../config/dbConfig.js";
const { db } = dbConfig;

export const createMapRow = async (name, user_id, lat, lng) => {
    try {
        const [mapRow] = await db.query('INSERT INTO maps (name, user_id, lat, lng) VALUES (?, ?, ?, ?)', [name, user_id, lat, lng]);
        console.log(`map ${name} created with id ${mapRow.insertId}`);
        return mapRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getMapRowById = async (id) => {
    try {
        const [mapRow] = await db.query('SELECT * FROM maps WHERE id = ?', [id]);
        console.log(`map ${id} found`);
        return mapRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}