<template>
  <br/>
  <div id="header-ctn" v-stuck>
    <header>
      <h1>ultr42</h1>

    </header>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
#header-ctn {

  position: sticky;
  top: 0;
  height: 8rem;
  pointer-events: none;
}

header {
  height: 100%;
  width: 100%;
  transition: all 200ms ease;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  pointer-events: all;
  & > h1{
    transition: all 200ms ease;
    font-family: "Open sans";
    font-weight: 700;
    font-size: 1.75rem;
    letter-spacing: 0.2rem;
  }

  & > * {
    margin: 0;
  }
}

#header-ctn[stuck] > header {
  height: 4rem;


  & > h1{
    font-size: 1.25rem;
  }
}

#header-ctn[stuck]{
  background: linear-gradient(180deg, var(--bg-0) 40%, transparent);
}

</style>
6
