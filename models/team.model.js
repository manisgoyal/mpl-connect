const mongoose = require('mongoose');
const TeamSchema = mongoose.Schema;

let Team = new TeamSchema({
    teamId: {
        required: true,
        type: Number
    },
    teamName: {
        required: true,
        type: String
    },
    member1: {
        required: true,
        type: String
    },
    member2: {
        required: true,
        type: String
    },
    member3: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Team', Team);