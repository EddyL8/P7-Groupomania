const mongoose = require('mongoose'); 

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    lastname: { type: String, required: false },
    firstname: { type: String, required: false },
    message: {type: String, required: true },
    mediaUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Post', postSchema);