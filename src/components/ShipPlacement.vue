<template lang="pug">
  h1 testg
</template>

<script>
  export default {
    name: "ShipPlacement",
    data() {
      return {
        GameConfiguration: null
      }
    },
    mounted: function () {
      let self = this
      this.$http.post(this.$config.API_BASE + 'getGameBoards', {
        BoardHeight: this.$route.query.boardHeight,
        BoardLength: this.$route.query.boardLength,
        ShipPreset: this.$route.query.shipPreset,
        GameMode: this.$route.query.gameMode
      }, ).then(res => {
        console.log(res.data)
        self.GameConfiguration = res.data
      })
    }
  }
</script>

<style scoped>

</style>
