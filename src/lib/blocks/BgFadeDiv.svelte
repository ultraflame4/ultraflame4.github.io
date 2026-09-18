<script lang="ts">
    import { cn } from "$lib";
    interface Props {
        /**
         * Html class. Note that this affects the *inner* element.
         *
         * You can use this to, for example, make the fade div bigger.
         */
        class?: string;
    }
    const { class: _class }: Props = $props();
</script>

<!-- Added outline so that in firefox, there isnt like 1px of the background (back element the fade is covering) showing through -->
<div class="h-0 overflow-visible pointer-events-none outline-1 outline-background">
    <div
        class={cn(
            "h-32 -translate-y-full bg-linear-0 from-background to-transparent",
            _class,
        )}
    ></div>
</div>
