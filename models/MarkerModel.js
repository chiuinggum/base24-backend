class MarkerModel {
    static async createMarker(name, place_id, lat, lng) {
        try {
            const [markerRow] = await db.query('INSERT INTO markers (name, place_id, lat, lng) VALUES (?, ?, ?, ?)', [name, place_id, lat, lng]);
            console.log(`marker ${name} created with id ${markerRow.insertId}`);
            return markerRow;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};

export default MarkerModel;