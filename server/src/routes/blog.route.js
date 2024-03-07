import { Router } from "express";
import { 
    createBlog,
    getAllBlogs  
} from "../controllers/blog.controller.js";
import {upload} from "../middlewares/multer.middleware.js"


const router = Router()

router.route("/create").post(
    upload.fields([
        {
            name: "blogImage",
            maxCount: 1
        }, 
    ]),
    createBlog
    )

router.route("/getall").get(getAllBlogs)    


export default router