"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Loader2, FileText, Layout, Trash2 } from "lucide-react"

interface BlogPost {
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    tags: string[]
    featured: boolean
}

export default function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: currentSlug } = React.use(params)
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<BlogPost | null>(null)

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${currentSlug}`)
                if (res.ok) {
                    const data = await res.json()
                    setFormData({
                        ...data,
                        tags: data.tags.join(", "),
                    })
                }
            } catch (error) {
                console.error("Failed to fetch post:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [currentSlug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData) return
        setSaving(true)

        const tagsArray = (formData.tags as any)
            .split(",")
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag !== "")

        try {
            const res = await fetch(`/api/posts/${currentSlug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    tags: tagsArray,
                }),
            })

            if (res.ok) {
                router.push("/admin")
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to update post:", error)
        } finally {
            setSaving(false)
        }
    }

    if (loading || !formData) {
        return (
            <main className="min-h-screen bg-[#fdfdfd] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#fdfdfd] text-[#09090b] selection:bg-zinc-200">
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 animate-fadeIn">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-sm mb-4">
                            <ArrowLeft className="w-4 h-4" /> Back to Console
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
                            <FileText className="w-8 h-8" /> Edit Post
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Post Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl border border-zinc-100 bg-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-zinc-900/5 shadow-sm transition-all"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Content (Markdown)</label>
                                <textarea
                                    required
                                    rows={15}
                                    className="w-full px-6 py-5 rounded-3xl border border-zinc-100 bg-white font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-zinc-900/5 shadow-sm transition-all resize-none"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Excerpt</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-100 bg-zinc-50/30 text-xs text-zinc-600 focus:outline-none focus:ring-0 transition-all resize-none"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-100 bg-zinc-50/30 text-xs font-mono focus:outline-none focus:ring-0 transition-all"
                                        value={formData.tags as any}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value as any })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Publish Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-100 bg-zinc-50/30 text-xs font-mono focus:outline-none focus:ring-0 transition-all"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    />
                                    <label htmlFor="featured" className="text-xs font-bold text-zinc-700">Feature this post</label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-md hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Update Post</>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
