const mongoose = require('mongoose'); 

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: {type: String },
    mediaUrl: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Post', postSchema);