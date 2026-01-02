import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
    id: string; // Keep for compatibility with frontend if needed, though _id is standard in MongoDB
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    tags: string[];
    readingTime: number;
    featured: boolean;
    views: number;
<<<<<<< HEAD
=======
    images: { url: string; size: string; caption?: string }[];
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        excerpt: { type: String, default: "" },
        content: { type: String, required: true },
        date: { type: String, required: true },
        tags: [{ type: String }],
        readingTime: { type: Number, default: 0 },
        featured: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
<<<<<<< HEAD
=======
        images: [
            {
                url: { type: String, required: true },
                size: { type: String, default: "medium" },
                caption: { type: String, default: "" },
            },
        ],
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
    },
    { timestamps: true }
);

// No need for separate index as unique: true already creates one
// BlogPostSchema.index({ slug: 1 });

<<<<<<< HEAD
=======
if (process.env.NODE_ENV === "development" && mongoose.models.BlogPost) {
    delete mongoose.models.BlogPost;
}

>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
const BlogPost: Model<IBlogPost> =
    mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
