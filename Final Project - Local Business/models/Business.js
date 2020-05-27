var mongoose = require('mongoose');

var businessSchema = new mongoose.Schema({
    companyname: {
        type: String
    },
    founder: {
        type: String
    },
    industry: [String],

    website: {
        type: String
    },
    age: {
        type: Number
    },
    companysize:{
        type: Number
    },
    location:{
        type: String
    },
    description: {
        type: String
    },
    preview: {
        type: String
    },
});

var Business = mongoose.model('Business', businessSchema);
module.exports = Business;