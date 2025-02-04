<script lang="ts">

export interface TerminalTextInstructionConfig {

    next_index?: number | ((current_index: number) => number) // Sets the next instruction index to go to. When undefined, goes to next instruction
    body?: string | (() => string),
    delay?: number // How many cycles to wait for before next instruction
    flags?: Array<"typed" | "clear" | "inline" | "html">
}

export type TerminalTextInstruction = TerminalTextInstructionConfig | string | TerminalTextInstructionConfig[]

export function tti(body: string = "", inline = false, typed = false, delay = 0, clear = false): TerminalTextInstructionConfig {
    const flags: TerminalTextInstructionConfig["flags"] = []
    if (typed) flags.push("typed")
    if (clear) flags.push("clear")
    if (inline) flags.push("inline")

    return {
        body,
        delay,
        flags
    }
}

export function tti_clear(): TerminalTextInstructionConfig {
    return { flags: ["clear"] }
}

export function tti_delay(delay: number): TerminalTextInstructionConfig {
    return { delay: delay, flags: ['inline'] }
}
export function lerp(start: number, end: number, t: number): number {
    return start + t * (end - start);
}
export function tti_prompt(prompt?: string, ans?: string, opts?: { end?: string, ans_delay?: number }) {
    return [
        tti(prompt),
        tti_delay(opts?.ans_delay ?? Math.round(lerp(10, 15, Math.random()))),
        tti(ans, true, true),
    ]
}

</script>
<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef } from 'vue';


const props = defineProps<{
    sequence: TerminalTextInstruction[]
}>()


const next_instruction = ref(0)
const normalised_instructions = computed<TerminalTextInstructionConfig[]>(() =>
    props.sequence.flatMap((x) => {
        if (typeof x == "string") {
            return [{ body: x }]
        }

        if (Array.isArray(x)) {
            return x
        }

        return [x]
    })
)

function loadNextInstruction() {
    let next = normalised_instructions.value[next_instruction.value]
    if (next != undefined) {
        typeInstant = false

        if (typeof next == "string") {
            next = { body: next }
        }

        if (next.flags?.includes("clear")) {
            textToType.value = ""
            terminalBuffer.value = ""
        }
        if (!next.flags?.includes("inline") && next_instruction.value > 0) {
            textToType.value = textToType.value + "\n"
        }
        if (typeof next.body == "function") {
            textToType.value = textToType.value + next.body()
        }
        else {
            textToType.value = textToType.value + (next.body ?? "")
        }

        if (!next.flags?.includes("html")){
            textToType.value = textToType.value.replaceAll(" ", "&nbsp;")
        }

        if (next.next_index != undefined) {
            next_instruction.value = typeof next.next_index == "function" ? next.next_index(next_instruction.value) : next.next_index
        }
        else {
            next_instruction.value += 1
        }

        if (!next.flags?.includes("typed")) {
            typeInstant = true
        }

        wait_counter = next.delay ?? 0
    }
}

const textToType = ref("")
const terminalBuffer = ref("")
const transformedText = computed(() => terminalBuffer.value
    .replaceAll("\n", "<br>")
)
let typeInstant = false;
let wait_counter = 0;

const el = useTemplateRef('terminal')

onMounted(() => {
    const id = setInterval(() => {
        if (wait_counter > 0) {
            wait_counter -= 1
            return;
        }
        const nextChar = textToType.value[terminalBuffer.value.length]

        if (nextChar == undefined) {
            loadNextInstruction()
            return
        }

        terminalBuffer.value = terminalBuffer.value + nextChar
        if (typeInstant) {
            terminalBuffer.value = textToType.value
        }
        el.value?.scrollTo(0,el.value.scrollHeight)
    }, 30)
    return ()=>{
        clearInterval(id)
    }
})

</script>
<template>
    <div class="terminal border-2 border-indigo-500 bg-stone-950 rounded-xl font-mono p-2 overflow-auto">
        <div v-html="transformedText" class="content" ref="terminal"></div>
    </div>

</template>
<style lang="css" scoped>
.terminal {
    width: 100%;
    height: 100%;
}


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

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>