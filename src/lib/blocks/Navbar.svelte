<script lang="ts">
    import { goto } from "$app/navigation";
    import { asset, resolve } from "$app/paths";
    import { page } from "$app/state";

    interface Props {
        label?: string;
    }
    const props: Props = $props();

    const links: Record<string, string> = {
        About: resolve("/#about"),
        Blog: resolve("/blog"),
        Gallery: resolve("/gallery"),
    };

    function handleShortcuts(e: KeyboardEvent) {
        const targetElement =
            document.activeElement?.tagName?.toLocaleLowerCase() ?? "";

        if (["input", "textarea"].includes(targetElement)) return;

        const link = document.querySelector(
            `a[data-shortcutkey="${e.key.toLowerCase()}"]`,
        ) as HTMLAnchorElement;
        if (link) {
            goto(link.href);
        }
    }

    function isCurrent(href: string) {
        let href_path = new URL(href, page.url.origin).pathname;
        if (href_path.endsWith("/")){
            href_path=href_path.slice(0,-1)
        }

        if (href_path == import.meta.env.BASE_URL){
            return page.url.pathname == href_path
        }
        return page.url.pathname.startsWith(href_path);
    }
</script>

<svelte:window onkeydown={handleShortcuts} />
{#snippet nav_link(name: string, url: string, index: number)}
    <a
        href={url}
        class="h-full glow font-fancy relative flex items-center gap-1.5 mr-1"
        data-active={isCurrent(url)}
        data-shortcutkey={`${index}`}
    >
        <span
            class="inline-flex items-center justify-center font-mono text-xs bg-background size-4 ring ring-black rounded-sm"
            >{index}</span
        >
        <span class="nav-link-text">{name}</span>
    </a>
{/snippet}

<header
    class="p-(--nav-offset-units) w-full flex items-center justify-center sticky top-0 z-20"
>
    <nav
        class="acrylic h-(--nav-height-units) rounded-2xl min-w-32 w-fit p-2 flex items-center gap-3"
        
    >
        <a
            href={import.meta.env.BASE_URL}
            class="h-full glow"
            data-shortcutkey="`"
        >
            <img class="h-full" src={asset("/brand.png")} alt="clyh.me" />
        </a>
        {#if props.label !== undefined}
            <span class="font-fancy max-sm:hidden md:mr-8 lg:mr-32">/{props.label}</span>
        {/if}

        {#each Object.entries(links) as [name, url], idx}
            {@render nav_link(name, url, idx + 1)}
        {/each}
    </nav>
</header>

<style>
    [data-active="true"] .nav-link-text{
        filter: drop-shadow(0px 0px 2px var(--color-rainbow));
        /* @apply text-dimmed; */
    }
</style>
