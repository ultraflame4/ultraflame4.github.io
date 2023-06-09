<!--This component is anything like headers that wants to stick to the top like the topnav!-->
<!--When stuck the font size will also decrease! Use em instead of rem to react accordingly-->
<template>
    <div class="ctn" v-stuck>
        <div class="item">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.ctn {

    position: sticky;

    top: -1px;
    z-index: 50;
    padding: 0.75rem 1rem;
    pointer-events: all;
    transition: border 400ms ease, font-size 200ms ease, background-color 400ms ease, color 200ms ease;
}

.item {
    border-radius: 1rem;
    height: 2.75rem;
    display: flex;
    align-items: center;
    border: 2px solid transparent;
    transition: inherit;

}

.ctn[stuck] > .item {
    font-size: 0.95rem;
    background: var(--bg-1);
    border-color: var(--accent);
    z-index: 100;
    pointer-events: all;
    color: var(--txt-a-tinted);
}
</style>
