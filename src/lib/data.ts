import { minimatch } from "minimatch";

const full_data = import.meta.glob("../../data/**/*", {
    query: "?raw",
    eager: true
});

export function readContent(
    folder: string,
    pattern: string = "*.md",
): Record<string, string> {
    const prefix = `../../data/${folder}/`;

    const files = full_data;
    const entries = Object.entries(files)
        .filter(([path]) => {
            if (!path.startsWith(prefix)) {
                return false;
            }

            const filename = path.slice(prefix.length);
            return minimatch(filename, pattern);
        })
        .map(([k, v]) => {
            const i = k.lastIndexOf("/");
            return [k.slice(i + 1), (v as any).default] as [string, string];
        });
    return Object.fromEntries(entries);
}
