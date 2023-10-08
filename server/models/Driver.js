const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    regnumber : String,
    drivername : String,
    Telephone : String,
    driveravailability :String
    
}
)


const DriverModel = mongoose.model("Driver", DriverSchema)
module.exports = DriverModel