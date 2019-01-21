<template lang="pug">
  .container
    h1 Start a new battleships game
    form(@submit="goToShipPlacement")
      .form-group
        h4 Gameboard dimensions
        .form-row
          .col-md-6.col-sm-12.dimension-input
            input.form-control(type=number, id="board-height", autocomplete='off', placeholder='Height', v-model="boardHeight" required)
          .col-md-6.col-sm-12.dimension-input
            input.form-control(type=number, id="board-length", autocomplete='off', placeholder='Length', v-model="boardLength" required)
      .form-group
        .form-row
          .col-md-6.col-sm-12
            h4 Ship setup
            .btn-group.btn-group-toggle.btn-group-lg
              label.btn.btn-lg.btn-info(v-bind:class="{active: shipPreset === 'CLASSIC'}") Classic
                input(type="radio", id="classic", autocomplete="off", value="CLASSIC", v-model="shipPreset")
              label.btn.btn-lg.btn-primary(v-bind:class="{active: shipPreset === 'RUSSIAN'}") Russian
                input(type="radio", id="russian", autocomplete="off", value="RUSSIAN", v-model="shipPreset")
          .col-md-6.col-sm-12
            h4 Gamemode
            .btn-group.btn-group-toggle.btn-group-lg
              label.btn.btn-lg.btn-warning(v-bind:class="{active: gameMode === 'LocalMultiplayer'}") Local multiplayer
                input(type="radio", id="gamemode-local", autocomplete="off", value="LocalMultiplayer", v-model="gameMode")
              label.btn.btn-lg.btn-danger(v-bind:class="{active: gameMode === 'AI'}") VS artificial intelligence
                input(type="radio", id="gamemode-ai", autocomplete="off", value="AI", v-model="gameMode")
      .form-group
        .form-row.submit-button
          button.btn.btn-lg.btn-outline-success(type='submit') Place ships
</template>

<script>
  export default {
    name: "NewGame",
    data() {
      return {
        boardHeight: null,
        boardLength: null,
        shipPreset: null,
        gameMode: null
      }
    },
    methods: {
      goToShipPlacement: function () {
        this.$router.push({path: 'place-ships', query: {
            boardHeight: this.boardHeight,
            boardLength: this.boardLength,
            shipPreset: this.shipPreset,
            gameMode: this.gameMode
          }})
      }
    }
  }
</script>

<style scoped>
  h1 {
    margin-bottom: 50px;
  }

  h4 {
    margin-top: 30px;
  }

  .submit-button {
    margin-top: 50px;
  }

  .dimension-input {
    margin-top: 10px;
  }
</style>
