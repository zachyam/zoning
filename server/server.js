const express = require("express")
const cors = require("cors")

const app = express()
const pool = require('./database')

app.use(express.json())
app.use(cors())

app.get("/getZoneCompliance/:zone", async(req, res) => {
    const zone = req.params.zone
    const allZoneComplianceData = await pool.query('SELECT * FROM zones WHERE zone = $1', [zone])
    res.json(allZoneComplianceData.rows)
    // res.send("Response received: " + allZoneComplianceData)
})

app.listen(4000, () => console.log("Server on localhost:4000"));