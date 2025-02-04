<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';


interface TerminalTextInstruction {
    instant?: boolean,
    clear?: boolean,
    nonewline?: boolean,
    
    body: string
}



const textSequence: TerminalTextInstruction[] = [
    {
        body: "Login: powew\nPassword: ********\nWelcome world!"
    },
    {
        body: "Test"
    }
]


const next_counter = ref(0)
function loadNextInstruction(){
    const next = textSequence[next_counter.value]
    if (next){
        if (next.clear){
            textToType.value = ""
        }
        if (!next.nonewline && next_counter.value > 0){
            textToType.value = textToType.value + "\n"
        }
        textToType.value = textToType.value + next.body
        next_counter.value+=1
    }
}

const textToType = ref("")
const terminalText = ref("")
const transformedText = computed(()=>terminalText.value.replaceAll("\n","<br>"))
onMounted(() => {
    const id = setInterval(() => {

        const typedText = textToType.value.slice(0, terminalText.value.length)
        if (typedText != terminalText.value) {
            terminalText.value = ""
            return
        }

        const nextChar = textToType.value[terminalText.value.length]
        if (nextChar == undefined) {
            loadNextInstruction()
            return
        }


        terminalText.value = terminalText.value + nextChar
    }, 30)
})

</script>
<template>
    <div class="terminal border-2 border-stone-900 bg-stone-950 rounded-lg font-mono p-2">
        <div v-html="transformedText" class="content"></div>
        <!-- <div class="blinkingCursor"></div> -->
    </div>

</template>
<style lang="css" scoped>
.terminal {
    width: 100%;
    aspect-ratio: 16/9;
}

.content{
    /* display: inline;
    width: fit-content; */
}

.content::after {
    content: "";
    display: inline-block;
    width:6px;
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