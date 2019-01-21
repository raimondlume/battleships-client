<template lang="pug">
  .container
    .row
      .col-md-12.text-center
        img(src="../assets/boat.png").img-fluid
        h1 Battleships
    .row
      .col-md-6.col-xs-12.main-button
        button(type="button", v-on:click="goToNewGame").btn.btn-block.btn-lg.btn-info New Game
      .col-md-6.col-xs-12.main-button(v-if="loadGame === false")
        button(v-on:click="loadGame = true").btn.btn-block.btn-lg.btn-success Load Game
      .col-md-6.col-xs-12.main-button(v-if="loadGame === true")
        .input-group.input-group-lg
          input(type=number, placeholder='Game ID', aria-describedby=button-addon).form-control
          .input-group-append
            button.btn.btn-success(type=button, id=button-addon) Load
</template>

<script>
    export default {
        name: "MainMenu",
        data () {
          return {
            loadGame: false
          }
        },
        methods: {
          goToNewGame: function () {
            this.$router.push("new")
          }
        }
    }
</script>

<style scoped>
  .main-button{
    margin-top: 30px;
  }

</style>
