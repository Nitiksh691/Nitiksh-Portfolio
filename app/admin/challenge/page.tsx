"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Loader2 } from "lucide-react"

export default function AdminChallenge() {
    const [answers, setAnswers] = useState(["", "", ""])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/admin/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers }),
            })

            const data = await res.json()

            if (data.success) {
                router.push("/admin")
                router.refresh()
            } else {
                setError(data.error || "Incorrect answers. Try again.")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#fdfdfd] flex items-center justify-center px-6">
            <div className="w-full max-w-md space-y-8 animate-fadeIn">
                <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-zinc-900" />
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900">Admin Challenge</h1>
                    <p className="text-sm text-zinc-500">Prove you belong here by answering these three questions.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">1. Favorite Language?</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all"
                                value={answers[0]}
                                onChange={(e) => setAnswers([e.target.value, answers[1], answers[2]])}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">2. Launch Year?</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all"
                                value={answers[1]}
                                onChange={(e) => setAnswers([answers[0], e.target.value, answers[2]])}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">3. Admin Name?</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all"
                                value={answers[2]}
                                onChange={(e) => setAnswers([answers[0], answers[1], e.target.value])}
                            />
                        </div>
                    </div>

                    {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Unlock Admin"}
                    </button>
                </form>
            </div>
        </div>
    )
}
