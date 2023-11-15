const express = require("express")
const cors = require("cors")

const app = express()
const pool = require('./database')

app.use(express.json())
app.use(cors())

app.get("/getZoneCompliance/:zone", async(req, res) => {
    const zone = req.params.zone
    // Fetch all rows with matching zone name
    const zoneData = await pool.query('SELECT * FROM attributevalues WHERE zonename = $1', [zone]);

    if (zoneData.rows.length === 0) {
        return res.status(404).json({ error: "Zone not found" });
    }

    return res.json(zoneData.rows);
})

app.listen(4000, () => console.log("Server on localhost:4000"));