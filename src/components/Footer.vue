<template>
  <footer id="TheFoot">
    <small>
      &copy; Copyright 2021 <a href="mailto://ultraflame4@gmail.com">ultraflame4@gmail.com</a>
      | Website: <a href="https://ultraflame4.github.io">https://ultraflame4.github.io</a>
      | Email: <a href="mailto://ultraflame4@gmail.com">ultraflame4@gmail.com</a>
      | Github: <a href="https://github.com/ultraflame4/">https://github.com/ultraflame4/</a>
      | Contact: <a href="https://github.com/ultraflame4/#contact">https://github.com/ultraflame4/#contact</a>
    </small>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped lang="sass">
@import "src/assets/globals"
#TheFoot
  height: $size-5
  background-color: $color-dark1
  display: flex
  padding: 0 $size-2
  align-items: center
  justify-content: center
  position: relative
  bottom: 0
  left: 0
  right: 0
</style>