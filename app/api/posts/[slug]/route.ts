import { NextResponse } from "next/server"
import { getPostBySlug, updatePost, deletePost, getPostById } from "@/lib/posts"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const post = getPostBySlug(slug)

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const body = await request.json()

        // Find post by slug first to get ID
        const existingPost = getPostBySlug(slug)
        if (!existingPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        // Update post by ID
        const updatedPost = updatePost(existingPost.id, body)

        if (!updatedPost) {
            return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
        }

        return NextResponse.json(updatedPost)
    } catch (error) {
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params

        // Find post by slug first to get ID
        const existingPost = getPostBySlug(slug)
        if (!existingPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        const success = deletePost(existingPost.id)

        if (!success) {
            return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
        }

        return NextResponse.json({ message: "Post deleted successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
    }
}
