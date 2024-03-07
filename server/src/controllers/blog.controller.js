import { asyncHandler } from "../utlis/asyncHandler.js";
import {ApiError} from "../utlis/ApiError.js"
import { Blog} from "../models/blog.model.js"
import {uploadOnCloudinary} from "../utlis/cloudinary.js"
import { ApiResponse } from "../utlis/ApiResponse.js";
import mongoose from "mongoose";



const createBlog = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if slug already exists
    // check for blogImage
    // upload them to cloudinary, blogImage
    // create blog object - create entry in db
    // return res


    const { title, slug, content, author } = req.body
    // console.log("title: ", title);

    if (
        [title, slug, content, author ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedSlug = await Blog.findOne({ slug })

    if (existedSlug) {
        throw new ApiError(409, "Slug already exists")
    }

    const blogImageLocalPath = req.files?.blogImage[0]?.path;
    

    if (!blogImageLocalPath) {
        throw new ApiError(400, "BlogImage file is required")
    }

    const blogImage = await uploadOnCloudinary(blogImageLocalPath)

    if (!blogImage) {
        throw new ApiError(400, "blogImage file is required")
    }
   

    const blog = await Blog.create({
        author,
        blogImage: blogImage.url,
        title, 
        slug,
        content
    })

    const createdBlog = await Blog.findById(blog._id)

    if (!createdBlog) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdBlog, "Blog Created Successfully")
    )

} )

const getAllBlogs = asyncHandler( async (req, res) =>{

    try {
        const allblogs = await Blog.find();

        if (!allblogs || allblogs.length === 0) {
            throw new ApiError(404, "No blogs found");
        }
    
        return res.status(200).json(
            new ApiResponse(200, allblogs, "All Blogs Retrieved Successfully")
        )
        
    } catch (error) {
        
        console.error(error.message);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json(new ApiResponse(statusCode, null, error.message));
    }

})



export {
    createBlog,
    getAllBlogs
}