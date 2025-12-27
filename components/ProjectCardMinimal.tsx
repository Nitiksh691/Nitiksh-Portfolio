import { ExternalLink, ArrowUpRight } from "lucide-react"

interface ProjectCardMinimalProps {
    image: string
    title: string
    description: string
    tags: string[]
    link: string
}

export function ProjectCardMinimal({ image, title, description, tags, link }: ProjectCardMinimalProps) {
    return (
        <div className="group flex flex-col gap-4 p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all hover:border-zinc-200 hover:bg-zinc-50 hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-all group-hover:scale-105 duration-500"
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{title}</h3>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-700 transition-colors dark:text-zinc-400">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-zinc-500 lowercase bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400">
                            {tag}
                        </span>
                    ))}
                </div>

                <a
                    href={link}
                    className="flex items-center gap-1 mt-4 text-xs font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors decoration-zinc-200 group-hover:underline underline-offset-4 dark:group-hover:text-white"
                >
                    View Project <ArrowUpRight className="w-3 h-3" />
                </a>
            </div>
        </div>
    )
}
