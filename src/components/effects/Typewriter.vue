<script lang="ts">

export type TypeTextInstruction = {
    ty: "type",
    value: string,
    noanim?: boolean
    // When deleting this text, how many extra instructions (before this) to also delete
    delete_extra?: number
}



export type DeleteTextInstruction = {
    ty: "del",
    value: number,
    noanim?: boolean
}




export type TextInstruction = TypeTextInstruction | DeleteTextInstruction | {
    ty: "goto",
    value: number
} | {
    ty: "wait",
    value: number
} | {
    ty: "fallback"
    value: string
}

export const tti_type = (characters: string) => ({ ty: "type", value: characters } as TypeTextInstruction)
export const tti_insert = (word: string) => ({ ty: "type", value: word, noanim: true } as TypeTextInstruction)
export const tti_del = (n: number, noanim?: boolean) => ({ ty: "del", value: n, noanim } as TextInstruction)
export const tti_wait = (n: number) => ({ ty: "wait", value: n } as TextInstruction)
export const tti_goto = (step_index: number) => ({ ty: "goto", value: step_index } as TextInstruction)




export class TextTyper {
    private word_lens: TypeTextInstruction[] = [];
    private instructs: TextInstruction[] = [];

    private fallback: string = ""

    /**
     * Types out the characters in sequence 
     */
    seq(chars: string): this {
        const x = tti_type(chars)
        this.word_lens.push(x);
        this.instructs.push(x);
        this.fallback += chars
        return this;
    }

    /**
     * Inserts the text immediately. Useful for things like html.
     */
    ins(text: string): this {
        const x = tti_insert(text)
        this.word_lens.push(x);
        this.instructs.push(x);
        this.fallback += text
        return this;
    }

    /**Deletes the previous seq or ins.*/
    prev(instant = false): this {
        const last = this.word_lens.pop()
        if (!last) return this;
        this.instructs.push(tti_del(last.value.length, instant));
        this.fallback = this.fallback.slice(0, this.fallback.length - last.value.length)
        return this;
    }

    /**
     * Styled seq. Note that this inserts 3 instructions. Hence autoprev should use 3 as the parameter
     */
    styled_seq(text: string, opts?: { class?: string, style?: string }): this {

        let attrs_s = "";

        if (opts?.class !== undefined) {
            attrs_s += `class=\"${opts.class}\" `
        }
        if (opts?.style !== undefined) {
            attrs_s += `style=\"${opts.style}\" `
        }
        this.ins(`<span ${attrs_s}>`).seq(text).ins("</span>")
        this.word_lens[this.word_lens.length - 1].delete_extra = 2 // Also deloete the 2 prev text blocks
        return this
    }

    /**Deletes the n previous seq or ins. If ins, deletes words instantly*/
    autoprev(n: number = 1): this {
        for (let _index = 0; _index < n; _index++) {
            const last = this.word_lens.pop()
            if (!last) return this;

            if (last.delete_extra) {
                _index -= last.delete_extra;
            }

            this.instructs.push(tti_del(last.value.length, last.noanim));
            this.fallback = this.fallback.slice(0, this.fallback.length - last.value.length)
        }
        return this;
    }

    /**
     * Wait abit before continuing to the next instruction
     * @param n 
     */
    wait(n: number): this {
        this.instructs.push(tti_wait(n));
        return this
    }

    /**
     * Inserts a raw tti_goto instruction
     * 
     * Not recommended. You should do repeated tests and tries to get the value you need as some methods in this class inserts multiple instructions.
     * 
     * @param n 
     */
    tti_goto(n: number): this {
        this.instructs.push(tti_goto(n));
        return this;
    }

    /**
     * Returns the final text instructions.
     * 
     * This will return the both instructions and a fallback string if javascript is not enabled
     */
    build(): { instructs: TextInstruction[], fallback: string } {
        return { instructs: this.instructs, fallback: this.fallback };
    }
}
</script>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';


interface iprops {
    instructions: TextInstruction[],
    interval?: number,
    hideCursor?: boolean,
    fallback: string
}
const props = defineProps<iprops>()



const typed_text = ref(`<noscript>${props.fallback}</noscript>`);

let wait_counter = 0;
let current = 0

const interval = computed(() => props.interval ?? 1)
const current_sub_instruct = ref<DeleteTextInstruction | TypeTextInstruction | false>(false)

function loadNext() {
    // End of instructions. Do nothing!
    if (current >= props.instructions.length) return;
    const next = props.instructions[current]
    console.log("LOAD NEXT", next)
    current += 1

    if (next.ty == "wait") {
        wait_counter = next.value
        return;
    }
    if (next.ty == "type") {
        current_sub_instruct.value = { ...next } // Clone object
        return;
    }
    if (next.ty == "del") {
        current_sub_instruct.value = { ...next } // Clone object
        return;
    }
    if (next.ty == "goto") {
        current = next.value
        return;
    }
}

const loop = ref()


function tick() {

    if (wait_counter > 0) {
        console.log("WAIT", wait_counter * interval.value, "ms")
        loop.value = setTimeout(tick, wait_counter)
        wait_counter = 0
        return;
    }

    const typing_instruct = current_sub_instruct.value
    // Load next instruction if no text to type.
    if (!typing_instruct) {
        loadNext()
        loop.value = setTimeout(tick, interval.value)
        return
    }
    console.log("NOW INSTRUCT", typing_instruct)
    if (typing_instruct.noanim) {
        if (typing_instruct.ty == "del") {
            typed_text.value = typed_text.value.slice(0, typed_text.value.length - typing_instruct.value)
            current_sub_instruct.value = false;
        }
        if (typing_instruct.ty == "type") {
            typed_text.value = typed_text.value + typing_instruct.value;
            current_sub_instruct.value = false;
        }
    }
    else {
        if (typing_instruct.ty == "del") {
            // On finish del, clear instruction
            if (typing_instruct.value == 0) {
                current_sub_instruct.value = false;
            }
            else {
                typed_text.value = typed_text.value.slice(0, typed_text.value.length - 1)
                typing_instruct.value -= 1;
            }
        }
        if (typing_instruct.ty == "type") {
            // On finish type, clear instruction
            if (typing_instruct.value.length == 0) {
                current_sub_instruct.value = false;
            }
            else {
                typed_text.value = typed_text.value + typing_instruct.value.slice(0, 1);
                typing_instruct.value = typing_instruct.value.slice(1, typing_instruct.value.length);
            }
        }
    }

    loop.value = setTimeout(tick, interval.value)
}

onMounted(() => {
    loop.value = setTimeout(tick, interval.value)
    return () => {
        if (loop.value) clearTimeout(loop.value)
    }
})

</script>
<template>

    <span v-html="typed_text" class="content" :data-hidecursor="(!current_sub_instruct) && props.hideCursor">

    </span>
</template>
<style scoped>
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