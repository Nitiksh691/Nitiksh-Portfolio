import dbConnect from "./mongodb";
import BlogPost, { IBlogPost } from "@/models/Post";

export interface BlogPost {
    id: string;
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
    createdAt?: string;
    updatedAt?: string;
}

// Helper to convert Mongoose document to plain object
function mapPost(post: any): BlogPost {
<<<<<<< HEAD
=======
    const images = post.images && post.images.length > 0
        ? post.images.map((img: any) => ({
            url: img.url,
            size: img.size,
            caption: img.caption || ""
        }))
        : (post.imageUrl ? [{ url: post.imageUrl, size: post.imageSize || "medium", caption: "" }] : []);

>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
    return {
        id: post._id.toString(),
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        tags: post.tags,
        readingTime: post.readingTime,
        featured: post.featured,
        views: post.views,
<<<<<<< HEAD
=======
        images: images,
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
        createdAt: post.createdAt?.toISOString(),
        updatedAt: post.updatedAt?.toISOString(),
    };
}

export async function getAllPostsDB(): Promise<BlogPost[]> {
    await dbConnect();
    const posts = await BlogPost.find({}).sort({ date: -1 });
    return posts.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    await dbConnect();
    const post = await BlogPost.findOne({ slug });
    return post ? mapPost(post) : null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
    await dbConnect();
    const post = await BlogPost.findById(id);
    return post ? mapPost(post) : null;
}

export async function createPost(postData: Partial<BlogPost>): Promise<BlogPost> {
    await dbConnect();
    // Ensure slug is generated if not provided
    if (!postData.slug && postData.title) {
        postData.slug = slugify(postData.title);
    }

    const post = await BlogPost.create(postData);
    return mapPost(post);
}

export async function updatePost(slug: string, postData: Partial<BlogPost>): Promise<BlogPost | null> {
    await dbConnect();
    const post = await BlogPost.findOneAndUpdate({ slug }, postData, { new: true });
    return post ? mapPost(post) : null;
}

export async function deletePost(slug: string): Promise<boolean> {
    await dbConnect();
    const result = await BlogPost.deleteOne({ slug });
    return result.deletedCount > 0;
}

export async function incrementViews(slug: string): Promise<void> {
    await dbConnect();
    await BlogPost.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
}
