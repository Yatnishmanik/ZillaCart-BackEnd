const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const sidebarSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        Price: {
            type: Number,
            required: [true, "Content is required"],
        },
        offer:{
            type: String,
        },
        link:{
            type:String,
        },
        image: {
            url: String,
            public_id: String,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        }, 
    },
    { timestamps: true }
);

module.exports = mongoose.model('sidePost', sidebarSchema);
