const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        avatar: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        googleId: {
            type: String
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User