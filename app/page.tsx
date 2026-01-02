"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter, ArrowUpRight, Calendar, Clock, Eye, Mail, X, Play, Pause, SkipForward, Music } from "lucide-react"
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

const tracks = [
  { name: "Track 1", src: "/music/track1.mp3" },
  { name: "Track 2", src: "/music/track2.mp3" },
  { name: "Track 3", src: "/music/track3.mp3" }
]

export default function Home() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [imageModalOpen, setImageModalOpen] = useState(false)

  // Music player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [showPlayer, setShowPlayer] = useState(true)

  // Typewriter effect
  const [displayText, setDisplayText] = useState("")
  const fullText = "Software Engineer"

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0)

  // Visible sections for fade-in
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // Skills for marquee
  const skills = [
    "React", "TypeScript", "Next.js", "Node.js", "Python", "MongoDB",
    "Tailwind CSS", "PostgreSQL", "Docker", "AWS", "Git", "JavaScript",
    "Express.js", "GraphQL", "Redis", "Linux", "Machine Learning", "Deep Learning"
  ]

  const contributions = [
    // {
    //   title: "Google Summer of Code, SugarLabs",
    //   subtitle: "Redesigned project storage of Music Blocks via GitHub",
    //   description: "Worked on enhancing the storage layer of Music Blocks, improving performance and reliability.",
    //   link: "https://github.com/Nitiksh691",
    // },
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

  // Typewriter effect
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Scroll progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0
      setScrollProgress(scrolled)
    }
    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  // Intersection Observer for fade-in animations
  useEffect(() => {
    // Mark header as visible immediately
    setVisibleSections(prev => new Set(prev).add('header'))

    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) {
              setVisibleSections(prev => new Set(prev).add(id))
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

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

  // Music player effects - Fixed auto-play
  useEffect(() => {
    const audioElement = new Audio(tracks[currentTrack].src)
    audioElement.loop = false
    audioElement.volume = 0.5

    const handleEnded = () => {
      const nextTrack = (currentTrack + 1) % tracks.length
      setCurrentTrack(nextTrack)
    }

    const handleCanPlay = () => {
      // Try to play when audio is ready
      if (isPlaying) {
        audioElement.play().catch(() => {
          // Auto-play prevented, will wait for user interaction
        })
      }
    }

    audioElement.addEventListener('ended', handleEnded)
    audioElement.addEventListener('canplay', handleCanPlay)

    setAudio(audioElement)

    return () => {
      audioElement.removeEventListener('ended', handleEnded)
      audioElement.removeEventListener('canplay', handleCanPlay)
      audioElement.pause()
      audioElement.src = ''
    }
  }, [currentTrack])

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented
            setIsPlaying(false)
          })
        }
      } else {
        audio.pause()
      }
    }
  }, [audio, isPlaying])

  // Auto-play on first user interaction
  useEffect(() => {
    if (!audio) return

    const handleFirstInteraction = () => {
      if (!isPlaying) {
        setIsPlaying(true)
      }
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }

    // Try to play immediately (might work in some browsers)
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      // If it fails, wait for user interaction
      document.addEventListener('click', handleFirstInteraction, { once: true })
      document.addEventListener('touchstart', handleFirstInteraction, { once: true })
      document.addEventListener('keydown', handleFirstInteraction, { once: true })
    })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [audio])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length
    setCurrentTrack(next)
    setIsPlaying(true)
  }

  return (
    <main className="min-h-screen bg-[#fdfdfd] text-[#09090b] font-sans selection:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-black animate-gradient opacity-50" />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-zinc-200/50 dark:bg-zinc-800/50 z-50">
        <div
          className="h-full bg-zinc-900 dark:bg-zinc-50 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Image Modal - Smaller, in-place */}
      {imageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <button
            onClick={() => setImageModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-zinc-300 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src="/me.png"
              alt="Profile"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              width={500}
              height={500}
            />
          </div>
        </div>
      )}

      {/* Minimal Music Player */}
      {showPlayer && (
        <div className="fixed bottom-4 left-4 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-2 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            ) : (
              <Play className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            )}
          </button>
          <button
            onClick={nextTrack}
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Next track"
          >
            <SkipForward className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          </button>
          <span className="text-xs text-zinc-600 dark:text-zinc-400 px-2 font-medium min-w-[60px]">
            {tracks[currentTrack].name}
          </span>
          <button
            onClick={() => setShowPlayer(false)}
            className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Hide player"
          >
            <X className="w-3 h-3 text-zinc-500" />
          </button>
        </div>
      )}

      {/* Show music icon when player is hidden */}
      {!showPlayer && (
        <button
          onClick={() => setShowPlayer(true)}
          className="fixed bottom-4 left-4 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Show music player"
        >
          <Music className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        </button>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 space-y-16 sm:space-y-20 md:space-y-24 relative">

        {/* Theme Toggle - Fixed position for mobile */}
        <div className="fixed top-4 right-4 sm:absolute sm:top-12 sm:right-6 z-10">
          <ThemeToggle />
        </div>

        {/* Header section */}
        <section
          id="header"
          className={`space-y-6 sm:space-y-8 fade-in-section ${visibleSections.has('header') ? 'visible' : ''}`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <button
              onClick={() => setImageModalOpen(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-1 shadow-sm overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
            >
              <Image
                src="/me.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                width={100}
                height={100}
              />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Nitiksh</h1>
              <div className="flex items-center gap-2 text-zinc-500 text-sm mt-1.5 dark:text-zinc-400">
                <span className="font-medium">
                  {displayText}
                  {displayText.length < fullText.length && <span className="animate-blink">|</span>}
                </span>
                <span>•</span>
                <span className="font-light">20-something year old</span>
                <div className="flex items-center gap-3 ml-2">
                  <a href="https://github.com/Nitiksh691" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors dark:hover:text-white"><Github className="w-4 h-4" /></a>
                  <a href="https://x.com/NitikshDas" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors dark:hover:text-white"><Twitter className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-zinc-600 leading-relaxed max-w-2xl dark:text-zinc-400 text-sm sm:text-base">
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

        {/* Skills Section with Marquee */}
        <section
          id="skills"
          className={`space-y-6 sm:space-y-8 fade-in-section ${visibleSections.has('skills') ? 'visible' : ''}`}
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Skills & Technologies</h2>
          <div className="relative overflow-hidden py-4 border-y border-zinc-200 dark:border-zinc-800 marquee-container group">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#fdfdfd] via-[#fdfdfd]/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#fdfdfd] via-[#fdfdfd]/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 z-10 pointer-events-none" />

            <div className="flex animate-marquee whitespace-nowrap gap-8 will-change-transform">
              {[...skills, ...skills].map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm flex-shrink-0"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section
          id="experience"
          className={`space-y-6 sm:space-y-8 fade-in-section ${visibleSections.has('experience') ? 'visible' : ''}`}
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Cool places I've contributed</h2>
          <div className="grid gap-4">
            {contributions.length > 0 ? contributions.map((item, i) => (
              <ExperienceCard key={i} {...item} />
            )) : <p className="text-zinc-400 text-sm italic">Working on some open source stuff.</p>}
          </div>
        </section>

        {/* Education section */}
        <section
          id="education"
          className={`space-y-6 sm:space-y-8 fade-in-section ${visibleSections.has('education') ? 'visible' : ''}`}
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Education</h2>
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-100 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Delhi Technological University</h3>
            <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">B.Tech, Civil | 2023 - 2027 | GPA: It's bit(0/1) private</p>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed dark:text-zinc-400">
              Got introduced to CS, started building things, made great friends, president of my Lit Soc.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-100 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Roots Country School</h3>
            <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">Class 10th-12th | 2022 - 2023 | 10th-75%, 12th-75%  </p>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed dark:text-zinc-400">
              Spent nice years there in a valley of Himachal and really have a nice conversation that time.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-100 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">DL DAV Public School</h3>
            <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">class LkG-9th | 2008 - 2021/22</p>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed dark:text-zinc-400">
              Unforegtable days
            </p>
          </div>
        </section>

        {/* Projects section */}
        <section
          id="projects"
          className={`space-y-6 sm:space-y-8 fade-in-section ${visibleSections.has('projects') ? 'visible' : ''}`}
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Stuff I built</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {projects.length > 0 ? projects.map((project, i) => (
              <ProjectCardMinimal key={i} {...project} />
            )) : <p className="text-zinc-400 text-sm italic">No projects found.</p>}
          </div>
        </section>

        {/* Contact section */}
        <section
          id="contact"
          className={`space-y-6 sm:space-y-8 border-t border-zinc-100 pt-12 sm:pt-16 dark:border-zinc-800 fade-in-section ${visibleSections.has('contact') ? 'visible' : ''}`}
        >
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Get in touch</h2>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://github.com/Nitiksh691"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://x.com/NitikshDas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-sm font-medium">Twitter</span>
            </a>
            <a
              href="nitikshpal@gmail.com"
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Email</span>
            </a>
          </div>
        </section>

        {/* Writing section */}
        <section
          id="blogs"
          className={`space-y-8 sm:space-y-10 pb-16 sm:pb-24 border-t border-zinc-100 pt-8 sm:pt-12 dark:border-zinc-800 fade-in-section ${visibleSections.has('blogs') ? 'visible' : ''}`}
        >
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
