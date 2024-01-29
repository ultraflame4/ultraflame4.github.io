<template>
    <div v-html="render()">
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



    text = text.replace("\\","\\\\")
    text = text.replace("\n\n","<br/>")
    text = text.replace("\n","<wbr/>")
    text = mdRenderer.parse(text) as string
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


div::v-deep(ul > li > ul > li > ul) {
    list-style-type: square;
}

div::v-deep(ul > li > ul) {
    list-style-type: circle;
}

div::v-deep(ul) {
    list-style: initial;
}

::v-deep(ul), ::v-deep(ol) {
    overflow: visible;
    margin: 0 0 0.5em;
    padding-left: 1.25rem;
}


div::v-deep(li) {
    overflow: visible;
    margin: 0 0 0.25em;
    display: list-item;
    font-size: 1em;
}

div::v-deep(>*) {
    margin-left: 0;
    margin-right: 0;
}

</style>