import { ExternalLink } from "lucide-react"

interface ExperienceCardProps {
    logo?: string
    title: string
    subtitle: string
    description: string
    link?: string
}

export function ExperienceCard({ logo, title, subtitle, description, link }: ExperienceCardProps) {
    return (
        <div className="group relative flex items-start gap-4 p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all hover:border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center overflow-hidden dark:bg-zinc-800 dark:border-zinc-700">
                {logo ? (
                    <img src={logo} alt={title} className="w-8 h-8 object-contain" />
                ) : (
                    <div className="w-6 h-6 bg-zinc-100 rounded-sm" />
                )}
            </div>

            <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-zinc-900 truncate dark:text-zinc-50">{title}</h3>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-zinc-900 transition-colors dark:hover:text-white"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
                <p className="text-sm font-medium text-zinc-600 mb-1 dark:text-zinc-400">{subtitle}</p>
                <p className="text-sm text-zinc-500 line-clamp-2 group-hover:text-zinc-600 transition-colors dark:text-zinc-400">{description}</p>
            </div>

            <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-300 uppercase group-hover:text-zinc-400 transition-colors">
                {link && "Link"}
            </div>
        </div>
    )
}
