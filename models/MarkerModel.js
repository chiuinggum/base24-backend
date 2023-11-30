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
    static async createMarkerInfo(marker_id, info) {
        try {
            const [markerInfoRow] = await db.query('INSERT INTO marker_info (marker_id, info) VALUES (?, ?)', [marker_id, info]);
            console.log(`marker info with marker_id: ${marker_id} created with id ${infoRow.insertId}`);
            return markerInfoRow;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};

export default MarkerModel;