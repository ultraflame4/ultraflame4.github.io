<script lang="ts">
    import { onMount } from "svelte";
    import type {
        TextInstruction,
        TypeTextInstruction,
        DeleteTextInstruction,
    } from "./typewriter";

    interface Props {
        instructions: TextInstruction[];
        interval?: number;
        hideCursor?: boolean;
        fallback: string;
    }

    let props: Props = $props();

    let typed_text = $state(`<noscript>${props.fallback}</noscript>`);

    let wait_counter = 0;
    let current = 0;

    const interval = $derived(props.interval ?? 100);
    let current_sub_instruct = $state<
        DeleteTextInstruction | TypeTextInstruction | false
    >(false);

    let loop: ReturnType<typeof setTimeout> | undefined;

    function loadNext() {
        // End of instructions. Do nothing!
        if (current >= props.instructions.length) return;
        const next = props.instructions[current];
        current += 1;

        if (next.ty == "wait") {
            wait_counter = next.value;
            return;
        }
        if (next.ty == "type") {
            current_sub_instruct = { ...next }; // Clone object
            return;
        }
        if (next.ty == "del") {
            current_sub_instruct = { ...next }; // Clone object
            return;
        }
        if (next.ty == "goto") {
            current = next.value;
            return;
        }
    }

    function tick() {
        if (wait_counter > 0) {
            loop = setTimeout(tick, wait_counter);
            wait_counter = 0;
            return;
        }

        const typing_instruct = current_sub_instruct;
        // Load next instruction if no text to type.
        if (!typing_instruct) {
            loadNext();
            loop = setTimeout(tick, interval);
            return;
        }

        if (typing_instruct.noanim) {
            if (typing_instruct.ty == "del") {
                typed_text = typed_text.slice(
                    0,
                    typed_text.length - typing_instruct.value,
                );
                current_sub_instruct = false;
            }
            if (typing_instruct.ty == "type") {
                typed_text = typed_text + typing_instruct.value;
                current_sub_instruct = false;
            }
        } else {
            if (typing_instruct.ty == "del") {
                // On finish del, clear instruction
                if (typing_instruct.value == 0) {
                    current_sub_instruct = false;
                } else {
                    typed_text = typed_text.slice(0, typed_text.length - 1);
                    typing_instruct.value -= 1;
                }
            }
            if (typing_instruct.ty == "type") {
                // On finish type, clear instruction
                if (typing_instruct.value.length == 0) {
                    current_sub_instruct = false;
                } else {
                    typed_text = typed_text + typing_instruct.value.slice(0, 1);
                    typing_instruct.value = typing_instruct.value.slice(
                        1,
                        typing_instruct.value.length,
                    );
                }
            }
        }

        loop = setTimeout(tick, interval);
    }

    onMount(() => {
        loop = setTimeout(tick, interval);

        return () => {
            if (loop) clearTimeout(loop);
        };
    });

    const hideCursorClass = $derived(!current_sub_instruct && props.hideCursor);
</script>

<span class="content" data-hidecursor={hideCursorClass}>
    {@html typed_text}
</span>

<style>
    .content::after {
        content: "";
        display: inline-block;

        width: 6px;
        height: 1em;
        position: relative;
        top: 0.15em;
        background-color: white;
        animation: blink 1s step-start infinite;
    }

    .content[data-hidecursor="true"]::after {
        display: none;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>
