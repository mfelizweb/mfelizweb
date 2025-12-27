"use client";

import { Lang } from "@/types/flip-project";
import { FlipProject } from "@/types/flip-project";



export default function ProjectFlipCards({
    projects,
    lang = "en",
}: {
    projects: FlipProject[];
    lang?: Lang;
}) {
    return (
        <section className="w-full py-24">
            <div className="mx-auto max-w-6xl grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p, i) => (
                    <div key={i} className="group perspective">
                        <div className="relative h-[360px] w-full transition-transform duration-700 ease-out transform-style-preserve-3d group-hover:rotate-y-180">

                            {/* FRONT — IMAGE */}
                            <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />

                            </div>

                            {/* BACK — INFO */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gray-900 p-6 text-white shadow-lg">
                                <h3 className="text-xl font-semibold leading-tight">
                                    {p.title}
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {p.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black dark:bg-gray-100 dark:text-gray-900"

                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-4 text-sm leading-relaxed text-gray-300">
                                    {p.description[lang]}
                                </p>

                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
