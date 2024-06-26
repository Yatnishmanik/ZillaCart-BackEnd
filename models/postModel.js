const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        category: {
            type: String, // Assuming category is a string, adjust type if necessary
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        image: {
            url: String,
            public_id: String,
        },
        likes: [{ type: ObjectId, ref: "User" }],
        comments: [
            {
                text: String,
                created: { type: Date, default: Date.now },
                postedBy: {
                    type: ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
