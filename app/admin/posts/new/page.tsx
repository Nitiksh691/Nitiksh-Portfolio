"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
<<<<<<< HEAD
import { ArrowLeft, Save, Loader2, FileText, Layout, Plus } from "lucide-react"
=======
import { ArrowLeft, Save, Loader2, FileText, Layout, Plus, Trash2 } from "lucide-react"
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2

export default function NewPostPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        tags: "",
        date: new Date().toISOString().split("T")[0],
        featured: false,
<<<<<<< HEAD
=======
        images: [] as { url: string; size: string; caption?: string }[],
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
    })
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

<<<<<<< HEAD
=======
    const addImage = () => {
        setFormData({
            ...formData,
            images: [...formData.images, { url: "", size: "medium" }]
        })
    }

    const removeImage = (index: number) => {
        const newImages = [...formData.images]
        newImages.splice(index, 1)
        setFormData({ ...formData, images: newImages })
    }

    const updateImage = (index: number, field: "url" | "size" | "caption", value: string) => {
        const newImages = [...formData.images]
        newImages[index] = { ...newImages[index], [field]: value }
        setFormData({ ...formData, images: newImages })
    }

>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const tagsArray = formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    tags: tagsArray,
                }),
            })

            if (res.ok) {
                router.push("/admin")
                router.refresh()
            } else {
                const data = await res.json()
                setError(data.details || data.error || "Failed to create post")
            }
        } catch (error) {
            console.error("Failed to create post:", error)
            setError(error instanceof Error ? error.message : "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
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
                            <Plus className="w-8 h-8" /> Draft New Post
                        </h1>
                    </div>
                </div>


                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium animate-shake dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Post Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="The Future of Architecture..."
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
                                    placeholder="# Introduction..."
                                    className="w-full px-6 py-5 rounded-3xl border border-zinc-100 bg-white font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-zinc-900/5 shadow-sm transition-all resize-none"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-6">
<<<<<<< HEAD
                                <div className="space-y-2">
=======
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Post Images</label>
                                        <button
                                            type="button"
                                            onClick={addImage}
                                            className="p-1 hover:bg-zinc-100 rounded-md transition-colors text-zinc-400 hover:text-zinc-900"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {formData.images.map((img, index) => (
                                            <div key={index} className="p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100 space-y-3 relative group">
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 p-1 bg-white border border-zinc-100 rounded-full text-zinc-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>

                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-mono uppercase text-zinc-400">Caption / Heading</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Add a heading or caption..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-100 bg-white text-[11px] focus:outline-none transition-all"
                                                        value={img.caption || ""}
                                                        onChange={(e) => updateImage(index, "caption", e.target.value)}
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-mono uppercase text-zinc-400">Image URL</label>
                                                    <input
                                                        type="url"
                                                        placeholder="https://..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-100 bg-white text-[11px] focus:outline-none transition-all"
                                                        value={img.url}
                                                        onChange={(e) => updateImage(index, "url", e.target.value)}
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-mono uppercase text-zinc-400">Display Size</label>
                                                    <select
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-100 bg-white text-[11px] focus:outline-none transition-all"
                                                        value={img.size}
                                                        onChange={(e) => updateImage(index, "size", e.target.value)}
                                                    >
                                                        <option value="small">Small</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="large">Large</option>
                                                        <option value="full">Full Width</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ))}

                                        {formData.images.length === 0 && (
                                            <button
                                                type="button"
                                                onClick={addImage}
                                                className="w-full py-4 border-2 border-dashed border-zinc-100 rounded-2xl text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:border-zinc-200 hover:text-zinc-500 transition-all"
                                            >
                                                + Add First Image
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4 border-t border-zinc-50">
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
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
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
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
                                disabled={loading}
                                className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-md hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Publish Post</>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
<<<<<<< HEAD
        </main >
=======
        </main>
>>>>>>> 792e071dfa17ae2da1bcd55e399a5e927e4b62c2
    )
}


