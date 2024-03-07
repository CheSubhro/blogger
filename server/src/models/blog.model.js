import mongoose, {Schema} from "mongoose";


const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        content: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        author: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        blogImage: {
            type: String, // cloudinary url
            required: true,
        },

    },
    {
        timestamps: true
    }
);

// Middleware to automatically generate lowercase slug before saving
blogSchema.pre("save", function (next) {
    // Generate the slug from the title
    const generatedSlug = slugify(this.title, { lower: true });
    
    // Assign the generated slug to the 'slug' field
    this.slug = generatedSlug;
  
    // Continue with the save operation
    next();
  });


export const Blog = mongoose.model("Blog", blogSchema)