const cloudinary = require('../utils/cloudinary');
const Sidebarpost = require('../models/sidebarpost');
const ErrorResponse = require('../utils/errorResponse');
const main = require('../app');

//create post
exports.createsidePost = async (req, res, next) => {
    const { title, Price, offer, image,link } = req.body;

    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: "posts",
            width: 1200,
            crop: "scale"
        });

        // Create post with category
        const post = await Sidebarpost.create({
            title,
            Price,
            offer,
            link, 
            postedBy: req.user._id,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
        });

        res.status(201).json({
            success: true,
            post
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};



//show posts
exports.showsidePost = async (req, res, next) => {
    try {
        const posts = await Sidebarpost.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
        res.status(201).json({
            success: true,
            posts
        })
    } catch (error) {
        next(error);
    }

}

//delete post
exports.deletesidePost = async (req, res, next) => {
    const currentPost = await Sidebarpost.findById(req.params.id);
    //delete post image in cloudinary       
    const ImgId = currentPost.image.public_id;
    if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
    }
    try {
        const post = await Sidebarpost.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "post deleted"
        })

    } catch (error) {
        next(error);
    }
}


//update post
exports.updatesidePost = async (req, res, next) => {
    try {
        const { title, Price, offer, image,link } = req.body;
        const currentPost = await Sidebarpost.findById(req.params.id);

        // Build the object data
        const data = {
            title: title || currentPost.title,
            Price: Price || currentPost.Price,
            offer: offer || currentPost.offer,
            image: image || currentPost.image,
            link: link || currentPost.link
        }

        // Modify post image conditionally
        if (req.body.image !== '') {
            const ImgId = currentPost.image.public_id;
            if (ImgId) {
                await cloudinary.uploader.destroy(ImgId);
            }
            const newImage = await cloudinary.uploader.upload(req.body.image, {
                folder: 'posts',
                width: 1200,
                crop: "scale"
            });

            data.image = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            }
        }

        const postUpdate = await Sidebarpost.findByIdAndUpdate(req.params.id, data, { new: true });

        res.status(200).json({
            success: true,
            postUpdate
        });

    } catch (error) {
        next(error);
    }
};
exports.showSidesinglePost = async (req, res, next) => {
    try {
        const post = await Sidebarpost.findById(req.params.id);
        // console.log(post);
        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        next(error);
    }

}


