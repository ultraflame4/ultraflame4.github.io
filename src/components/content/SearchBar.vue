<template>
    <div>
        <Icon icon="ph:magnifying-glass-bold" class="icon"/>
        <input placeholder="Search for titles, description, skills" v-model="inputValue"/>
<!--        {{ inputValue }}-->
    </div>
</template>

<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {computed, ref} from "vue";

const props = defineProps<{ searchTerm: string }>()
const emit = defineEmits<{ (e: 'update:searchTerm', value: string): void }>()
const inputValue = computed({
    get() {
        return props.searchTerm;
    },
    set(v: string): void {
        // console.log(emit)
        emit("update:searchTerm",v)
    }

})

</script>

<style lang="scss" scoped>
div {
    position: sticky;
    bottom: 1rem;
    height: 2.75rem;
    padding: 0 1rem;
    background: var(--bg-0);
    color: white;
    border-radius: 1rem;
    border: 2px solid var(--bg-2);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:focus-within {
        & > .icon {
            color: var(--accent);
        }

        border-color: var(--accent);
    }

    * {
        transition: color 200ms ease;
    }
}

input {
    width: 100%;
    height: 100%;

    border: none;
    outline: none;
    color: var(--txt-p);
    background: inherit;

    transition: transform 200ms ease;
    font-weight: 700;
    letter-spacing: 0.05em;
    font-size: 0.9rem;
    font-family: "Montserrat";

    &::placeholder {
        color: var(--bg-3);
    }

}

.icon {
    color: var(--bg-3);
    font-size: 1.35rem;

}
</style>
