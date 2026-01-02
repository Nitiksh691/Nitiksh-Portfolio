"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Eye, Calendar } from "lucide-react"

interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    date: string
    tags: string[]
    readingTime: number
    views: number
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch("/api/posts")
                if (res.ok) {
                    const data = await res.json()
                    if (Array.isArray(data)) {
                        setBlogs(data)
                    } else {
                        setBlogs([])
                    }
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error)
                setBlogs([])
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    const allTags = Array.from(new Set(blogs.flatMap((post) => post.tags))).sort()

    const filteredBlogs = selectedTag
        ? blogs.filter((post) => post.tags.includes(selectedTag))
        : blogs

    if (loading) {
        return (
            <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-20 selection:bg-zinc-200 dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="h-6 w-32 bg-zinc-100 rounded-lg animate-pulse mb-12"></div>
                    <div className="space-y-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-28 bg-zinc-50 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-20 text-[#09090b] selection:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-12 text-sm font-medium dark:hover:text-white">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="space-y-6 mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 animate-fadeIn dark:text-zinc-50">Writing</h1>
                    <p className="text-zinc-500 max-w-2xl leading-relaxed dark:text-zinc-400">
                        Thoughts on software, building things, and navigating the world of tech.
                    </p>
                </div>

                <div className="mb-12">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTag === null
                                ? "bg-zinc-900 text-white shadow-sm"
                                : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white dark:hover:border-zinc-600"
                                }`}
                        >
                            All Posts
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTag === tag
                                    ? "bg-zinc-900 text-white shadow-sm"
                                    : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white dark:hover:border-zinc-600"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-16">
                    {filteredBlogs.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block space-y-3"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-2xl font-bold text-zinc-800 group-hover:text-zinc-600 transition-colors dark:text-zinc-200 dark:group-hover:text-white">
                                    {post.title}
                                </h2>
                                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 group-hover:text-zinc-600 shrink-0">
                                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                                    <span>{new Date(post.date).getFullYear()}</span>
                                </div>
                            </div>
                            <p className="text-zinc-500 leading-relaxed line-clamp-2 dark:text-zinc-400">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 pt-1">
                                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{post.readingTime} min read</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredBlogs.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-zinc-200 rounded-3xl dark:border-zinc-800">
                        <p className="text-zinc-400 italic">No posts found in this collection.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
