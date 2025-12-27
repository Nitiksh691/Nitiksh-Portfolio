"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full border border-zinc-200 bg-white text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-4 h-4" />
            ) : (
                <Moon className="w-4 h-4" />
            )}
        </button>
    )
}
