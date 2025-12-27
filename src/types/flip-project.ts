export type Lang = "es" | "en";

export type FlipProject = {
    title: string;
    tags: string[];
    image: string;
    description: Record<Lang, string>;
};
