<template>
    <div v-bind="props" ref="target">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { useEventListener } from '@vueuse/core';
import { onMounted, ref, useTemplateRef } from 'vue';

const props = defineProps<{ class?: string, anchor_container?: string, root?: string }>()
const current_element = ref<Element>()
const self = useTemplateRef("target")


function scroll_element_into_view(ele: Element) {
    if (!self.value) {
        return
    }
    current_element.value = ele
    const eleRect = ele.getBoundingClientRect()
    const parentRect = self.value.getBoundingClientRect()
    self.value.scrollBy({ top: eleRect.top - parentRect.top, behavior: "smooth" });

}

function hijack_anchors() {
    let anchor_ctn = props.anchor_container ? document.querySelector(props.anchor_container) : document
    console.log(anchor_ctn)
    if (!anchor_ctn) return

    let target_elements = self.value?.querySelectorAll("[id]").entries().map(x => x[1]) ?? []

    for (const ele of target_elements) {
        const hash = "#" + ele.id

        let anchors = anchor_ctn.querySelectorAll(`a[href="${hash}"]`) ?? []
        console.log("Hijacking click for anchors with hash", hash, anchors)
        anchors.forEach((_x) => {
            let anchor = _x as HTMLAnchorElement;
            anchor.dataset["hijacked"]="true"
            anchor.addEventListener("click", (e) => {
                current_element.value = ele;

                e.preventDefault()
                scroll_element_into_view(ele)

                history.replaceState(null, '', hash)
            });
            
            // }
            // }
        });

    }
}

onMounted(() => {

    hijack_anchors()

    // Account for initial page load! (and maybe scroll ourselves into view)
    let target = self.value?.querySelector(location.hash)
    if (target) {
        if (props.root) {
            document.querySelector(props.root)?.scrollIntoView()
        }
        console.log("Hash detected:", location.hash, "Scrolling to element:", target)
        scroll_element_into_view(target)
    }


})
useEventListener("resize", () => {
    if (location.hash.slice(1) === current_element.value?.id) {
        scroll_element_into_view(current_element.value)
    }
    else {
        current_element.value = undefined;
    }
})

</script>
<style></style>