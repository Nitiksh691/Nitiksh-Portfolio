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
    },
    { timestamps: true }
);

// No need for separate index as unique: true already creates one
// BlogPostSchema.index({ slug: 1 });

const BlogPost: Model<IBlogPost> =
    mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
