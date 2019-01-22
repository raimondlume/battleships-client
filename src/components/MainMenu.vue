<template lang="pug">
  .container
    .row
      .col-md-12.text-center
        img(src="../assets/boat.png").img-fluid
        h1 Battleships
    .row
      .col-md-6.col-xs-12.main-button
        button(type="button", v-on:click="goToNewGame").btn.btn-block.btn-lg.btn-info New Game
      .col-md-6.col-xs-12.main-button(v-if="loadGameEnabled === false")
        button(v-on:click="loadGameEnabled = true").btn.btn-block.btn-lg.btn-success Load Game
      .col-md-6.col-xs-12.main-button(v-if="loadGameEnabled === true")
        .input-group.input-group-lg
          input(type=number placeholder='Game ID' v-model="gameId" aria-describedby=button-addon).form-control
          .input-group-append
            button.btn.btn-success(type=button id=button-addon v-on:click="loadGame") Load
</template>

<script>
    export default {
        name: "MainMenu",
        data () {
          return {
            loadGameEnabled: false,
            gameId: null
          }
        },
        methods: {
          goToNewGame: function () {
            this.$router.push("new")
          },
          loadGame: function () {
            const gameId = this.gameId
            this.$router.push({name: 'Game', params: {gameID: gameId}})
          }
        }
    }
</script>

<style scoped>
  .main-button{
    margin-top: 30px;
  }

</style>
