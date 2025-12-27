import { NextResponse } from "next/server"
import { getAllPostsDB, createPost, slugify } from "@/lib/posts"

export async function GET() {
    try {
        const posts = await getAllPostsDB()
        return NextResponse.json(posts)
    } catch (error) {
        console.error("GET /api/posts error:", error)
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log("Creating post with data:", body)

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
        })

        console.log("Post created successfully:", newPost.slug)
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

