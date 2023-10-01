const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    registernumber : String,
    drivername : String,
    Telephone : String,
    
}
)


const DriverModel = mongoose.model("Driver", DriverSchema)
module.exports = DriverModel