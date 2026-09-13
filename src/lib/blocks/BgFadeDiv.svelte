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

<div class="h-0 overflow-visible">
    <div
        class={cn(
            "h-32 -translate-y-full bg-linear-0 from-background to-transparent",
            _class,
        )}
    ></div>
</div>
