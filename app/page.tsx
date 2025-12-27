"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, ArrowUpRight, Calendar, Clock, Eye } from "lucide-react"
import { ExperienceCard } from "@/components/ExperienceCard"
import { ProjectCardMinimal } from "@/components/ProjectCardMinimal"
import { ThemeToggle } from "@/components/ThemeToggle"

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

export default function Home() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const contributions = [
    {
      title: "Google Summer of Code, SugarLabs",
      subtitle: "Redesigned project storage of Music Blocks via GitHub",
      description: "Worked on enhancing the storage layer of Music Blocks, improving performance and reliability.",
      link: "https://github.com/Nitiksh691",
    },
  ]

  const projects = [
    {
      title: "Build an Quick-Commerce",
      description: "Sell your products online with Quick-Commerce.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop",
      tags: ["Web Sockets", "Nextjs", "Stripe", "Tailwind CSS", "Shadcn UI"],
      link: "https://qwikker-liard.vercel.app",
    },
  ]

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
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <main className="min-h-screen bg-[#fdfdfd] text-[#09090b] font-sans selection:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-24">

        {/* Header section */}
        <section className="space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl border border-zinc-200 bg-white p-1 shadow-sm overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
                <Image
                  src="/me.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Nitiksh</h1>
                <div className="flex items-center gap-2 text-zinc-500 text-sm mt-1 dark:text-zinc-400">
                  <span>Software Engineer</span>
                  <span>•</span>
                  <span>20-something year old</span>
                  <div className="flex items-center gap-3 ml-2">
                    <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors dark:hover:text-white"><Github className="w-4 h-4" /></a>
                    <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors dark:hover:text-white"><Linkedin className="w-4 h-4" /></a>
                    <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors dark:hover:text-white"><Twitter className="w-4 h-4" /></a>
                  </div>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div className="space-y-4 text-zinc-600 leading-relaxed max-w-2xl dark:text-zinc-400">
            <p>
              I build things. From web apps and backends to Machine Learning and Deep Learning, I love exploring how systems work. My next deep dive is into the world of embedded systems and low-level programming.
            </p>
            <p>
              This isn’t just a portfolio—it’s a <strong>directory of my explorations</strong>. I use this space to document the things software engineers often overlook: hardware, startup growth, and the business side of tech.
            </p>
            <p className="text-sm italic opacity-80">
              It is currently <b>01:21 AM</b> on <i>Dec 28, 2025</i>. I’m setting high goals for this space, and if you’re reading an article here, it means I’m following through. Feel free to explore.
            </p>
          </div>
        </section>

        {/* Experience section */}
        <section className="space-y-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Cool places I've contributed</h2>
          <div className="grid gap-4">
            {contributions.length > 0 ? contributions.map((item, i) => (
              <ExperienceCard key={i} {...item} />
            )) : <p className="text-zinc-400 text-sm italic">Working on some open source stuff.</p>}
          </div>
        </section>

        {/* Education section */}
        <section className="space-y-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Education</h2>
          <div className="p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Delhi Technological University</h3>
            <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">B.Tech, Civil | 2023 - 2027 | GPA: It's bit(0/1) private</p>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed dark:text-zinc-400">
              Got introduced to CS, started building things, made great friends, president of my Lit Soc.
            </p>
          </div>


          <div className="p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Roots Country School</h3>
            <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">Class 10th-12th | 2022 - 2023 | 10th-75%, 12th-75%  </p>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed dark:text-zinc-400">
              Spent nice years there in a valley of Himachal and really have a nice conversation that time.
            </p>
          </div>


          <div className="p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">DL DAV Public School</h3>
            <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">class LkG-9th | 2008 - 2021/22</p>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed dark:text-zinc-400">
              Unforegtable days
            </p>
          </div>

        </section>

        {/* Projects section */}
        <section className="space-y-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Stuff I built</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.length > 0 ? projects.map((project, i) => (
              <ProjectCardMinimal key={i} {...project} />
            )) : <p className="text-zinc-400 text-sm italic">No projects found.</p>}
          </div>
        </section>

        {/* Writing section */}
        <section className="space-y-10 pb-24 border-t border-zinc-100 pt-20 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Writing</h2>
            <Link href="/blog" className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1.5 dark:hover:text-white">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-8">
            {blogs.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block space-y-2.5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-zinc-800 group-hover:text-zinc-600 transition-colors dark:text-zinc-200 dark:group-hover:text-white">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 group-hover:text-zinc-600 transition-colors shrink-0">
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                    <span>{new Date(post.date).getFullYear()}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed dark:text-zinc-400">{post.excerpt}</p>
              </Link>
            ))}

            {loading && (
              <div className="space-y-6 animate-pulse">
                {[1, 2].map(i => (
                  <div key={i} className="h-24 bg-zinc-50 rounded-2xl border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800" />
                ))}
              </div>
            )}

            {!loading && blogs.length === 0 && (
              <p className="text-sm text-zinc-400 italic">No posts yet. Working on something interesting.</p>
            )}
          </div>
        </section>

      </div>
    </main>
  )
}
