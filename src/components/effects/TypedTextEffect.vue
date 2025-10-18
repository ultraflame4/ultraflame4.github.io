<script lang="ts">

export type TypeTextInstruction = {
    ty: "type",
    value: string,
    noanim?: boolean
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
}

export const tti_type = (characters: string) => ({ ty: "type", value: characters } as TypeTextInstruction)
export const tti_insert = (word: string) => ({ ty: "type", value: word, noanim: true } as TextInstruction)
export const tti_del = (n: number, noanim?: boolean) => ({ ty: "del", value: n, noanim } as TextInstruction)
export const tti_wait = (n: number) => ({ ty: "wait", value: n } as TextInstruction)
export const tti_goto = (step_index: number) => ({ ty: "goto", value: step_index } as TextInstruction)



</script>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';



const props = defineProps<{ instructions: TextInstruction[], speed?: number, interval?: number, hideCursor?: boolean }>()



const typed_text = ref("");

let wait_counter = 0;
let current = 0

const current_sub_instruct = ref<DeleteTextInstruction | TypeTextInstruction | false>(false)

function loadNext() {
    // End of instructions. Do nothing!
    if (current >= props.instructions.length) return;
    console.log(`next! ${current}`);
    const next = props.instructions[current]
    current += 1
    wait_counter = props?.interval ?? 30

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


onMounted(() => {
    const id = setInterval(() => {

        const typing_instruct = current_sub_instruct.value
        // Load next instruction if no text to type.
        if (!typing_instruct) {
            loadNext()
            return
        }
        if (typing_instruct.noanim) {
            if (typing_instruct.ty == "del") {
                typed_text.value = typed_text.value.slice(0, typed_text.value.length - typing_instruct.value)
                current_sub_instruct.value = false;
                return;
            }
            if (typing_instruct.ty == "type") {
                typed_text.value = typed_text.value + typing_instruct.value;
                current_sub_instruct.value = false;
                return;
            }
            return;
        }
        if (typing_instruct.ty == "del") {
            // On finish del, clear instruction
            if (typing_instruct.value == 0) {
                current_sub_instruct.value = false;
                return
            }
            typed_text.value = typed_text.value.slice(0, typed_text.value.length - 1)
            typing_instruct.value -= 1;
            return;
        }
        if (typing_instruct.ty == "type") {
            // On finish type, clear instruction
            if (typing_instruct.value.length == 0) {
                current_sub_instruct.value = false;
                return
            }
            typed_text.value = typed_text.value + typing_instruct.value.slice(0, 1);
            typing_instruct.value = typing_instruct.value.slice(1, typing_instruct.value.length);
            return;
        }

    }, props.speed ?? 1)
    return () => {
        clearInterval(id)
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