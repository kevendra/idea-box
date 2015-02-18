var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var user = new Schema({
    thirdPartyOauthUserId: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    lastName: {
        type: String
    },
    firstName: {
        type: String
    },
    displayName: {
        type: String
    },
    accessToken: {
        type: String,
        required: true
    },
    loginType: {
    	type: String
    },
    thumbnail: {
    	type: String
    }
});

module.exports = {
    User: user
};
