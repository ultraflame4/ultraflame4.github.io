<!--This component is anything like headers that wants to stick to the top like the topnav!-->
<!--When stuck the font size will also decrease! Use em instead of rem to react accordingly-->
<template>
    <div class="ctn" v-stuck>
        <div class="item floater-shadow">
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
    //transition: border 2ms linear, font-size 400ms ease, background-color 100ms ease, color 500ms ease;
}

.item {
    border-radius: 1rem;
    height: 2.9rem;
    display: flex;
    align-items: center;
    border: 2px solid transparent;
    transition: all 200ms ease;
    @media only screen and (max-width: 650px) {
        font-size: 1.5rem;
        height: 3.5rem;
    }
}

.ctn[stuck] > .item {
    font-size: 0.95rem;
    //background: var(--bg-1);
    border-color: var(--active-color);
    z-index: 100;
    pointer-events: all;
    color: var(--txt-a-tinted);
}
</style>
