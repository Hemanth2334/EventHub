const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrganisationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    email: { type: String, required: true },
    CategoryName: { type: String, required: true },
    owner: {                                      
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                              
        required: true
    }
}, { 
    collection: 'Organisation' 
});

module.exports = mongoose.model('Organisation', OrganisationSchema);
