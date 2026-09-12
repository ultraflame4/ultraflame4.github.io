<script lang="ts">
    import { onMount } from "svelte";
    import type {
        TextOp,
        TypeTextOp,
        DeleteTextOp,
        TypewriterInputs,
    } from "./typewriter";
    import { LoopOperations } from "./typewriter";

    interface Props {
        inputs: TypewriterInputs;
        interval?: number;
        hideCursor?: boolean;
    }

    let props: Props = $props();

    let output = $state(`<noscript>${props.inputs.fallback}</noscript>`);

    let wait_until = 0;
    let step_counter = 0;

    // Loads the next instruction.
    //
    // Returns possible values
    // - TextOp - Text operation to carry out
    // - `LoadNextOp` - Special ops to control the animation loop
    function loadNext(): DeleteTextOp | TypeTextOp | LoopOperations {
        // End of instructions. Do nothing!
        if (step_counter >= props.inputs.instructs.length)
            return LoopOperations.Exit;
        const next = props.inputs.instructs[step_counter];
        step_counter += 1;

        if (next.ty == "wait") {
            wait_until = Date.now() + next.value;
            return LoopOperations.Skip;
        }
        if (next.ty == "type") {
            return { ...next }; // Clone object
        }
        if (next.ty == "del") {
            return { ...next }; // Clone object
        }
        if (next.ty == "goto") {
            step_counter = next.value;
            return LoopOperations.LoadNext;
        }
        throw "Unknown operation type: " + next.ty;
    }

    let currentTextOperation: DeleteTextOp | TypeTextOp | LoopOperations =
        LoopOperations.LoadNext;
    function tick() {
        if (Date.now() < wait_until) {
            requestAnimationFrame(tick);
            return;
        }

        // If text_op is false, fetch next instruction
        while (currentTextOperation === LoopOperations.LoadNext) {
            currentTextOperation = loadNext();
        }

        // text_op is true. No more instructions. Early return to exit
        if (currentTextOperation === LoopOperations.Exit) {
            return;
        }
        if (currentTextOperation === LoopOperations.Skip) {
            currentTextOperation = LoopOperations.LoadNext;
            requestAnimationFrame(tick);
            return;
        }
        const text_op = currentTextOperation;
        // Work on the current text operation
        if (text_op.noanim) {
            if (text_op.ty == "del") {
                output = output.slice(0, output.length - text_op.value);
                currentTextOperation = LoopOperations.LoadNext;
            }
            if (text_op.ty == "type") {
                output = output + text_op.value;
                currentTextOperation = LoopOperations.LoadNext;
            }
        } else {
            wait_until = Date.now() + (props.interval ?? 30);
            if (text_op.ty == "del") {
                // On finish del, clear instruction
                if (text_op.value == 0) {
                    currentTextOperation = LoopOperations.LoadNext;
                } else {
                    output = output.slice(0, output.length - 1);
                    text_op.value -= 1;
                }
            }
            if (text_op.ty == "type") {
                // On finish type, clear instruction
                if (text_op.value.length == 0) {
                    currentTextOperation = LoopOperations.LoadNext;
                } else {
                    output = output + text_op.value.slice(0, 1);
                    text_op.value = text_op.value.slice(
                        1,
                        text_op.value.length,
                    );
                }
            }
        }
        requestAnimationFrame(tick);
    }

    onMount(() => {
        requestAnimationFrame(tick);
    });

    const hideCursorClass = $derived(props.hideCursor);
</script>

<span class="content" data-hidecursor={hideCursorClass}>
    {@html output}
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
