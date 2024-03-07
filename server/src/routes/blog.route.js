import { Router } from "express";
import { 
    createBlog,  
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


export default router