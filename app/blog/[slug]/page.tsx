"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Eye, Share2 } from "lucide-react"

interface BlogPost {
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    tags: string[]
    readingTime: number
    views: number
}

export default function BlogPostReader({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${slug}`)
                if (res.ok) {
                    const data = await res.json()
                    setPost(data)

                    // Increment views
                    fetch(`/api/posts/${slug}/view`, { method: "POST" })
                }
            } catch (error) {
                console.error("Failed to fetch post:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [slug])

    if (loading) {
        return (
            <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-20 dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="h-4 w-24 bg-zinc-100 rounded animate-pulse mb-12"></div>
                    <div className="space-y-6">
                        <div className="h-10 w-3/4 bg-zinc-100 rounded animate-pulse"></div>
                        <div className="h-6 w-full bg-zinc-50 rounded animate-pulse"></div>
                        <div className="h-64 w-full bg-zinc-50 rounded animate-pulse pt-12"></div>
                    </div>
                </div>
            </main>
        )
    }

    if (!post) {
        return (
            <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-20 flex items-center justify-center dark:bg-zinc-950 transition-colors duration-300">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Post not found</h1>
                    <Link href="/blog" className="text-zinc-500 hover:text-zinc-900 transition-colors underline underline-offset-4 dark:text-zinc-400 dark:hover:text-white">
                        Back to writing
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-32 text-[#09090b] selection:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-16 text-sm font-medium dark:hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4" /> All writing
                </Link>

                <article className="space-y-12 animate-fadeIn">
                    <header className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readingTime} min read</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {post.views} views</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight dark:text-zinc-50">
                            {post.title}
                        </h1>

                        <p className="text-xl text-zinc-500 leading-relaxed italic border-l-2 border-zinc-100 pl-6 py-1 dark:text-zinc-400 dark:border-zinc-800">
                            {post.excerpt}
                        </p>
                    </header>

                    <div className="prose prose-zinc prose-lg max-w-none prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-p:leading-relaxed prose-a:text-zinc-900 prose-a:underline-offset-4 prose-strong:text-zinc-900 prose-code:text-zinc-900 prose-code:bg-zinc-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-50 prose-pre:text-zinc-900 prose-blockquote:border-l-zinc-200 prose-blockquote:text-zinc-500 prose-img:rounded-3xl dark:prose-headings:text-zinc-50 dark:prose-p:text-zinc-400 dark:prose-a:text-zinc-50 dark:prose-strong:text-zinc-50 dark:prose-code:text-zinc-50 dark:prose-code:bg-zinc-800 dark:prose-pre:bg-zinc-800 dark:prose-pre:text-zinc-50 dark:prose-blockquote:border-l-zinc-700 dark:prose-blockquote:text-zinc-400">
                        {post.content.split('\n').map((line, i) => (
                            <p key={i} className="mb-6">{line}</p>
                        ))}
                    </div>

                    <footer className="pt-16 border-t border-zinc-100 mt-20 dark:border-zinc-800">
                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-zinc-50 text-zinc-500 text-xs font-medium rounded-full border border-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden dark:bg-zinc-800">
                                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Nitiksh" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Nitiksh</p>
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Software Engineer</p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href)
                                    alert("Link copied!")
                                }}
                                className="p-2 rounded-full border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm dark:border-zinc-700 dark:hover:text-white dark:hover:border-zinc-600"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </main>
    )
}
