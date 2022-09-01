<template>
  <div id="others">
    <h1>
      Others
    </h1>
    <div class="content-ctn">
      <p>
        Wow such empty !
        <br>
        (｡•́︿•̀｡)
        <br>
        Am i all alone here?
        <br>
        I'm scared...
        <br>
        Would you stay here with me owo ?
        <br>
        Wait..are you leaving?. Please don't.. I'm scared...
        <br>
        Please.. I beg you.. don't leave me here alone..
        <br>
        <br>
        <br>
        <router-link to="/r">
        <b style="letter-spacing: 3px;font-weight: bolder; font-size: 20px;">D̵͔̣̠̯̦̗̾̿̾̓͋͘ọ̵̧̡̧͍̘̼͚̅͐͝͝͝N̴̨̞̞̝̖͕͔̠̣̓̅͂̈́̇̕'̵̡͍̗͓̤̇̋͗̌͒̂͊̕͝ͅt̵̢̪̓̊͌͘̕ ̷̬̞̔̀́̑̿͂͝╘̷̭̖̭̻̺̒e̸͔̳͉̓̑̎̿̾̓̑̇̃à̴͖̱̣̳̬̖͖͔̮̆͌v̶̡̨̢̗̤̒̈̈́̍̎̕̕ͅe̸͎̰͑̃ͅ</b>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Others"
}
</script>

<style scoped lang="sass">
@import "/src/assets/globals"
#others
  @extend .fullpage-end-section
  position: relative
  display: flex
  align-content: center
  flex-direction: column
  h1
    margin-top: $size-5
    margin-bottom: $size-5

  .content-ctn
    display: flex
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    align-content: center
    justify-content: center
    flex-grow: 1
    p
      margin: auto
      letter-spacing: 2px
      br
        font-size: 130%
      a
        cursor: pointer
</style>
