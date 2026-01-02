import { NextResponse } from "next/server"
import { getAllPostsDB, createPost, slugify } from "@/lib/posts"

export async function GET() {
    try {
        const posts = await getAllPostsDB()
        return NextResponse.json(posts)
    } catch (error) {
        console.error("GET /api/posts error:", error)
        return NextResponse.json({
            error: "Failed to fetch posts",
            details: error instanceof Error ? error.message : "Unknown error",
            stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
<<<<<<< HEAD
        console.log("Creating post with data:", body)
=======
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2

        // Validate required fields
        if (!body.title || !body.content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            )
        }

        // Generate slug if not provided
        const slug = body.slug || slugify(body.title)

        // Create post with defaults
        const newPost = await createPost({
            slug,
            title: body.title,
            excerpt: body.excerpt || "",
            content: body.content,
            date: body.date || new Date().toISOString().split("T")[0],
            tags: body.tags || [],
            readingTime: body.readingTime || calculateReadingTime(body.content),
            featured: body.featured || false,
<<<<<<< HEAD
        })

        console.log("Post created successfully:", newPost.slug)
=======
            images: body.images || [],
        })

>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
        return NextResponse.json(newPost, { status: 201 })
    } catch (error) {
        console.error("POST /api/posts error:", error)
        return NextResponse.json(
            { error: "Failed to create post", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        )
    }
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
}

