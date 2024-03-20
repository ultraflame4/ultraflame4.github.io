<template>
    <div v-html="render()" class="mdroot">
    </div>
</template>

<script setup lang="ts">/**
 * This component is an extremely simple markdown renderer design for putting content in the <p> html element
 */
import {link_expression, mdRenderer} from "@/tools/markdown-tools";
import DOMPurify from "dompurify";

interface _props {
    /** A string containing markdown content to render*/
    content: string,
    remove_link?: boolean
}

const props = defineProps<_props>()

function render(): string {
    let text = props.content
    if (props.remove_link) {
        text = text.replace(link_expression, "")
    }



    text = mdRenderer.parse(text) as string
    text = text.replaceAll("\n","")
    text = DOMPurify.sanitize(text)
    return text;
}

</script>

<style scoped lang="scss">
::v-deep(p):first-child {
    margin-top: 0;
}

::v-deep(p) {
    margin: 0.75em 0 0.1em;
    white-space: pre-wrap;
}


.mdroot::v-deep(ul > li > ul > li > ul) {
    list-style-type: square;
}

.mdroot::v-deep(ul > li > ul) {
    list-style-type: circle;
}

.mdroot::v-deep(ul) {
    list-style: initial;
}

::v-deep(ul), ::v-deep(ol) {
    overflow: visible;
    margin: 0 0 0.5em;
    padding-left: 1.25rem;
}


.mdroot::v-deep(li) {
    overflow: visible;
    margin: 0 0 0.25em;
    display: list-item;
    font-size: 1em;
}

.mdroot::v-deep(>*) {
    margin-left: 0;
    margin-right: 0;
}

.mdroot::v-deep(a){

    background: none;
    -webkit-background-clip: initial;

    &::after{
        content: "";
    }

    
    &:hover{
        color: var(--accent);
    }
}


.mdroot::v-deep(sub){
    color: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    font-size: 0.8em;
}

.mdroot::v-deep(table){
    margin: 0.75rem 0;
    font-size: 0.8rem;
    border-collapse: collapse;

    &, th, td{
        border: 1px solid var(--line);
        padding: 0.2rem;
    }
    
}
</style>