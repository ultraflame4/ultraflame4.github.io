<template>
  <div id="about">
    <h1>
      About Me
    </h1>
    <p>
      Im an amateur teen programmer who started programming in ~2018-2019.
      <br>
      I started programming because i wanted to create cool stuff, and let others interact and play with it
      <br>
      I've since then ,learned alot and used a wider variety of programming languages.
      <br>
      <br>
      Programming languages I've used:  Python, C# (unity), JavaScript, Typescript
      <br>
      <br>
      Languages I rarely use : C++, Java
    </p>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#about
  @extend .fullpage-section
  display: flex
  align-items: center
  height: $size-50
  flex-direction: column

  h1
    margin-top: $size-5
    margin-bottom: $size-5

  p
    font-size: $size-2

    br
      font-size: 150%

</style>