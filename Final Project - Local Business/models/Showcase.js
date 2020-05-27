var mongoose = require('mongoose');

var showcaseSchema = new mongoose.Schema({
    eventname: {
        type: String
    },
    location: {
        type: String
    },
    description:{
      type: String
    },
    website: {
        type: String
    }
});

var Showcase = mongoose.model('Showcase', showcaseSchema);
module.exports = Showcase;