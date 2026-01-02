"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit2, Trash2, Eye, ArrowLeft, Loader2, LayoutDashboard, FileText } from "lucide-react"

interface BlogPost {
    id: string
    slug: string
    title: string
    date: string
    views: number
}

export default function AdminDashboard() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts")
            if (res.ok) {
                const data = await res.json()
                if (Array.isArray(data)) {
                    setPosts(data)
                } else {
                    setPosts([])
                }
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return

        try {
            const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" })
            if (res.ok) {
                setPosts(posts.filter((p) => p.slug !== slug))
            }
        } catch (error) {
            console.error("Failed to delete post:", error)
        }
    }

    return (
        <main className="min-h-screen bg-[#fdfdfd] text-[#09090b] selection:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-sm mb-4 dark:hover:text-white">
                            <ArrowLeft className="w-4 h-4" /> View Site
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-3 dark:text-zinc-50">
                            <LayoutDashboard className="w-8 h-8" /> Admin Console
                        </h1>
                        <p className="text-zinc-500 font-medium font-mono text-xs uppercase tracking-widest dark:text-zinc-400">Post Management</p>
                    </div>

                    <Link
                        href="/admin/posts/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all shadow-sm hover:shadow-md dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                    >
                        <Plus className="w-5 h-5" /> New Post
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4 animate-fadeIn">
                        <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
                        <p className="text-zinc-400 text-sm font-mono tracking-widest uppercase">Loading Posts...</p>
                    </div>
                ) : (
                    <div className="bg-white border border-zinc-100 rounded-3xl shadow-sm overflow-hidden animate-fadeIn dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/30">
                                        <th className="px-8 py-5 text-xs font-mono uppercase tracking-widest text-zinc-400">Post Title</th>
                                        <th className="px-8 py-5 text-xs font-mono uppercase tracking-widest text-zinc-400">Date</th>
                                        <th className="px-8 py-5 text-xs font-mono uppercase tracking-widest text-zinc-400 text-center">Views</th>
                                        <th className="px-8 py-5 text-xs font-mono uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 uppercase text-xs font-mono font-medium">
                                    {posts.length > 0 ? (
                                        posts.map((post) => (
                                            <tr key={post.slug} className="group hover:bg-zinc-50/50 transition-colors dark:hover:bg-zinc-800/50">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 transition-colors dark:group-hover:text-white" />
                                                        <span className="text-zinc-900 line-clamp-1 dark:text-zinc-50">{post.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-zinc-400">
                                                    {new Date(post.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                                        <Eye className="w-3 h-3" /> {post.views}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <Link
                                                            href={`/admin/posts/${post.slug}/edit`}
                                                            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white hover:shadow-sm border border-transparent hover:border-zinc-200 rounded-lg transition-all dark:hover:text-white dark:hover:bg-zinc-800 dark:hover:border-zinc-700"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(post.slug)}
                                                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-red-100 rounded-lg transition-all dark:hover:bg-zinc-800 dark:hover:border-red-900"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center text-zinc-400 font-mono text-xs italic tracking-widest">
                                                No posts found. Start sharing your thoughts!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
