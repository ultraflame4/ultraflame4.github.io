import { addCollection, getIcon } from "@iconify/svelte";
import { icons as logos } from "@iconify-json/logos";
import { icons as lucide } from "@iconify-json/lucide";
import { icons as materialSymbols } from "@iconify-json/material-symbols";
import { icons as mdi } from "@iconify-json/mdi";
import { icons as devicon } from "@iconify-json/devicon";
import { icons as simple } from "@iconify-json/simple-icons";
import { icons as vscode } from "@iconify-json/vscode-icons";

addCollection(logos);
addCollection(lucide);
addCollection(materialSymbols);
addCollection(mdi);
addCollection(devicon);
addCollection(simple);
addCollection(vscode);

function iconToSVG(name: string): string | null {
    const icon = getIcon(name);
    if (!icon) {
        console.error("Missing icon:", name, "is icon set installed?")
        return null;
    }
    const w = icon.width || 16;
    const h = icon.height || 16;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${icon.body}</svg>`;
}

export function iconToDataURI(name: string): string {
    const svg = iconToSVG(name);
    if (!svg) return "missing icon: " + name
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}