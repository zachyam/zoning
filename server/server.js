const express = require("express")
const cors = require("cors")

const app = express()
const pool = require('./database')

app.use(express.json())
app.use(cors())

app.get("/getZoneCompliance/:zone", async(req, res) => {
    const zone = req.params.zone
    // Fetch zone details
    const zoneData = await pool.query('SELECT * FROM zones WHERE zoneName = $1', [zone]);

    if (zoneData.rows.length === 0) {
        return res.status(404).json({ error: "Zone not found" });
    }

    const zoneId = zoneData.rows[0].zoneId;

    // Fetch attribute values for the specified zoneId
    const attributeValuesData = await pool.query(
        'SELECT av.attributeValueId, av.zoneId, av.attributeName, av.minVal, av.maxVal, av.unit ' +
        'FROM attributeValues av ' +
        'WHERE av.zoneId = $1',
        [zoneId]
    );

    res.json(attributeValuesData.rows);
})

app.listen(4000, () => console.log("Server on localhost:4000"));