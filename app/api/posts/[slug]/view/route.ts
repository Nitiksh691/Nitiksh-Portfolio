import { NextResponse } from "next/server"
import { incrementViews } from "@/lib/posts"

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const views = incrementViews(slug)

        if (views === 0) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        return NextResponse.json({ views })
    } catch (error) {
        return NextResponse.json({ error: "Failed to increment views" }, { status: 500 })
    }
}
