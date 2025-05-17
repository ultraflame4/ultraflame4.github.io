<template>
    <div v-bind="props" ref="target">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue';

const props = defineProps<{ class: string, anchor_container?: string, root?: string }>()
const self = useTemplateRef("target")


function scroll_element_into_view(ele: Element) {
    if (!self.value) {
        return
    }
    const eleRect = ele.getBoundingClientRect()
    const parentRect = self.value.getBoundingClientRect()
    self.value.scrollBy({ top: eleRect.top - parentRect.top, behavior: "smooth" });

}

onMounted(() => {

    let anchor_ctn = props.anchor_container ? document.querySelector(props.anchor_container) : document
    if (!anchor_ctn) return

    let target_elements = self.value?.querySelectorAll("[id]").entries().map(x => x[1]) ?? []

    for (const ele of target_elements) {
        const hash = "#" + ele.id
        let anchors = anchor_ctn.querySelectorAll(`a[href="${hash}"]`) ?? []
        console.log("Hijacking click for anchors with hash", hash, anchors)
        anchors.forEach((_x) => {
            let anchor = _x as HTMLAnchorElement;

            anchor.addEventListener("click", (e) => {


                e.preventDefault()
                scroll_element_into_view(ele)

                history.replaceState(null, '', hash)
            });
            // }
            // }
        });

    }

    // Account for initial page load! (and maybe scroll ourselves into view)
    let target = self.value?.querySelector(location.hash)
    if (target) {
        if (props.root) {
            document.querySelector(props.root)?.scrollIntoView()
        }
        scroll_element_into_view(target)
    }
})

</script>
<style></style>