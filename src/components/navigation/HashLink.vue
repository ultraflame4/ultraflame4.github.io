<template>
  <a
    v-if="props.hash"
    :href="hash_s"
    class="no-hover no-deco"
    @click="anchor_clicked"
  >
    <template v-if="props.eraseinner"><slot></slot> </template>
    <template v-else>
      <Icon
        v-if="!noicon"
        :icon="props.icon ?? 'vaadin:hash'"
        class="search-icon"
      />
      <slot name="prefix"></slot>
      <div :class="`parent_hover-underline ${noicon ? '' : 'add-align'}`">
        <slot> </slot>
      </div>
      <slot name="suffix"></slot>
    </template>
  </a>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

interface iprops {
  /**
   * Any Hash if need to scroll to id. (With or without '#' works)
   */
  hash?: string;

  noicon?: boolean;
  /**
   *  Completely removes all inner html. Will disable icons, prefixes and suffixes
   */
  eraseinner?: boolean;

  /**
   * Specifies the icon to use. Useless if noicon = true
   */
  icon?: string;
}

const props = defineProps<iprops>();
const router = useRouter();
const route = useRoute();

const hash_s = computed(() => ("#" + props.hash ?? "").replace("##", "#"));

function anchor_clicked(e: MouseEvent) {
  e.preventDefault();
  let el = e.currentTarget as HTMLAnchorElement;

  const new_route = router.resolve({
    path: route.path,
    hash: hash_s.value,
    replace: true,
  });

  router.push(new_route);
  // navigator.clipboard.writeText(location.origin+new_route.href)
}
</script>

<style lang="scss" scoped>
a {
  letter-spacing: 0.1rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  cursor: pointer;

  width: fit-content;
  overflow: visible;
  color: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;

  div {
    //display: flex;
    //align-items: center;
  }
}

a:hover {
  color: var(--txt-a);
}

.search-icon {
  color: var(--accent);
  height: 100%;
  position: relative;
  top: 0.05rem;
  margin-right: 0.35em;
}
</style>
