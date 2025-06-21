<script lang="ts">

export interface OtherInstruction {
    type: "goto",
    
    _goto_index?: number
}

export type TextInstruction = string | number | OtherInstruction

export function tte_goto(index: number): OtherInstruction {
    return { type: "goto", _goto_index: index }
}

</script>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';



const props = defineProps<{ texts: TextInstruction[], speed?: number, interval?: number, hideCursor?: boolean }>()


const textToType = ref("")
const typedText = ref("");
const transformed = computed(() => typedText.value.replaceAll('\n', "<br>"))
let wait_counter = 0;
let current = 0
const is_typing = ref(false)
function loadNext() {
    if (current < props.texts.length) {
        const next = props.texts[current]
        wait_counter = props?.interval ?? 30
        if (typeof next == "number") {
            wait_counter = next
        }
        else if (typeof next == "string") {
            textToType.value = next
        }
        else if (typeof next == "object") {
            if (next["type"] == "goto") {
                current = next["_goto_index"] ?? current + 1
                return
            }


        }
        current += 1
    }
}


onMounted(() => {
    const id = setInterval(() => {
        is_typing.value=false
        if (wait_counter > 0) {
            wait_counter -= 1
            return
        }

        // If typed section not equal, remove the previous character
        const typedSection = textToType.value.slice(0, typedText.value.length)
        if (typedSection != typedText.value) {
            const lastChar = typedText.value[typedText.value.length - 1]

            // If it ends with ">" it may be a html tag. Use regex to check it.
            if (lastChar == ">") {
                const htmlTag_regex_last = /(<\/?[^<>]*>)$/g
                const match = htmlTag_regex_last.exec(typedText.value) // Use entire typed text.
                if (match){
                    // If it matches  and remove entirely all at once
                    typedText.value = typedText.value.slice(0, typedText.value.length - match[0].length)
                    // console.log(typedText.value)
                    return
                }
            }
            // Remove char one by one, (next one is in next interval), to give typing (backspace) effect
            typedText.value = typedText.value.slice(0, typedText.value.length - 1)
            return
        }

        const nextChar = textToType.value[typedText.value.length]

        // If next char begins with a '<' Check if it is a html tag
        if (nextChar == '<') {
            const searchS = textToType.value.slice(typedText.value.length)
            const htmlTag_regex_first = /^(<\/?[^<>]*>)/g

            const match = htmlTag_regex_first.exec(searchS)
            
            if (match) {
                // If match, type out the tag all at once
            
                typedText.value += match[0]
                return
            }
        }

        if (nextChar == undefined) {
            loadNext()
            return
        }

        is_typing.value=true
        typedText.value = typedText.value + nextChar
        
    }, props.speed ?? 1)
    return () => {
        clearInterval(id)
    }
})

</script>
<template>
    
    <span v-html="transformed" class="content" :data-hidecursor="(!is_typing)&&props.hideCursor">

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
.content[data-hidecursor="true"]::after{
    display: none;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>