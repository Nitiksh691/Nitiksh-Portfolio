"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Eye, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

interface BlogPost {
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    tags: string[]
    readingTime: number
    views: number
    images: { url: string; size: string; caption?: string }[]
}

export default function BlogPostReader({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
    const [selectedIndex, setSelectedIndex] = useState(0)

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

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on("select", () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        })
    }, [emblaApi])

    if (loading) {
        return (
            <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-20 dark:bg-zinc-950 transition-colors duration-300">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="h-4 w-24 bg-zinc-100 rounded animate-pulse mb-12"></div>
                    <div className="space-y-6">
                        <div className="h-10 w-3/4 bg-zinc-100 rounded animate-pulse"></div>
                        <div className="h-6 w-full bg-zinc-50 rounded animate-pulse"></div>
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

    const getImageSizeClass = (size?: string) => {
        switch (size) {
            case "small": return "max-w-sm"
            case "medium": return "max-w-xl"
            case "large": return "max-w-2xl"
            case "full": return "w-full"
            default: return "max-w-xl"
        }
    }

    return (
        <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-40 text-[#09090b] selection:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300 relative">
            {/* Sticky View Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 rounded-full shadow-2xl flex items-center gap-10 opacity-0 animate-fadeInUp" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                <div className="flex items-center gap-2 group cursor-default">
                    <Eye className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold tabular-nums text-zinc-900 dark:text-white">{post.views}</span>
                    <span className="text-[10px] uppercase tracking-tighter text-zinc-400">Views</span>
                </div>
                <div className="h-4 w-px bg-zinc-100 dark:bg-zinc-800"></div>
                <div className="flex items-center gap-2 group cursor-default">
                    <Clock className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold tabular-nums text-zinc-900 dark:text-white">{post.readingTime}</span>
                    <span className="text-[10px] uppercase tracking-tighter text-zinc-400">Min</span>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-16 text-sm font-medium dark:hover:text-white group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> All writing
                </Link>

                <article className="space-y-16 animate-fadeIn">
                    <header className="space-y-8">
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span>•</span>
                            <span className="text-zinc-900 dark:text-zinc-50 font-bold">Published</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1] dark:text-zinc-50">
                            {post.title}
                        </h1>

                        <p className="text-2xl text-zinc-500 leading-relaxed font-light dark:text-zinc-400">
                            {post.excerpt}
                        </p>
                    </header>

                    {post.images && post.images.length > 0 && (
                        <div className="space-y-8 py-10">
                            <div className="embla overflow-hidden rounded-3xl relative group" ref={emblaRef}>
                                <div className="embla__container flex">
                                    {post.images.map((img, index) => (
                                        <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 flex justify-center items-center p-2">
                                            <div className={`relative aspect-video rounded-2xl overflow-hidden border border-zinc-100 shadow-xl dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden ${getImageSizeClass(img.size)}`}>
                                                <img
                                                    src={img.url}
                                                    alt={img.caption || post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {post.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => emblaApi?.scrollPrev()}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-zinc-900/90 rounded-full shadow-lg text-zinc-900 dark:text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => emblaApi?.scrollNext()}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-zinc-900/90 rounded-full shadow-lg text-zinc-900 dark:text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Caption Section */}
                            <div className="space-y-4 px-2 min-h-[100px]">
                                {post.images[selectedIndex]?.caption && (
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white animate-fadeIn flex justify-center">
                                        {post.images[selectedIndex].caption}
                                    </h3>
                                )}
                                <div className="flex justify-center gap-2">
                                    {post.images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => emblaApi?.scrollTo(i)}
                                            className={`h-1 rounded-full transition-all duration-300 ${i === selectedIndex ? 'w-8 bg-zinc-900 dark:bg-white' : 'w-2 bg-zinc-200 dark:bg-zinc-800'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="prose prose-zinc prose-xl max-w-none prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-p:leading-relaxed prose-strong:font-bold prose-img:rounded-3xl dark:prose-headings:text-zinc-50 dark:prose-p:text-zinc-400 dark:prose-strong:text-zinc-50">
                        {post.content ? post.content.split('\n').map((line, i) => (
                            <p key={i} className="mb-8">{line}</p>
                        )) : <p>No content available for this post.</p>}
                    </div>

                    <footer className="pt-20 border-t border-zinc-100 mt-20 dark:border-zinc-800 space-y-10">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-zinc-50 text-zinc-500 text-xs font-bold rounded-full border border-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between py-10 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-3xl px-8 border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-zinc-100 overflow-hidden dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 shadow-sm">
                                    <img src="/me.png" alt="Nitiksh" className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Nitiksh</p>
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-bold">Full Stack Engineer</p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href)
                                    alert("Link copied!")
                                }}
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:text-white hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900 transition-all font-bold text-xs shadow-sm shadow-zinc-200/50"
                            >
                                <Share2 className="w-4 h-4" /> Share Post
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </main>
    )
}
