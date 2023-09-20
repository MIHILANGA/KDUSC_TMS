const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    vehiclenumber : String,
    vehicleowner : String,
    registerdate : Date,
    insurancedate : Date,
    expierddate : Date,
    
}
)


const VehicleModel = mongoose.model("Vehicle", VehicleSchema)
module.exports = VehicleModel