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

::v-deep(ul) {
    margin: 0 0 0.5em;
    padding: 0;
    list-style-type: none;
}

::v-deep(li) {
    margin: 0 0 0.25em;

}

::v-deep(li)::before {
    display: inline;
    content: "\2022";
    margin: 0 0.45em;
}

</style>