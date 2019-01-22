<template lang="pug">
  .container
    h1 Generate ship placement
    .row.gameboard-row
      .col-md-6
        game-board(v-bind:gameBoard="GameBoard1" v-if="GameConfiguration.GameMode === 1 || GameConfiguration.GameMode === 0 && switchView === false")
        button.btn.btn-lg.btn-outline-primary(v-if="GameConfiguration.GameMode === 0 && switchView === true" v-on:click="changeView") Switch player
      .col-md-6
        game-board(v-bind:gameBoard="GameBoard2" v-if="GameConfiguration.GameMode === 0 && switchView === true")
        button.btn.btn-lg.btn-outline-primary(v-if="GameConfiguration.GameMode === 0 && switchView === false" v-on:click="changeView") Switch player
    .row.text-center.button-row
      .col-md-6
        button.btn.btn-lg.btn-success(v-on:click="getRandomPlacement(1)" v-if="GameConfiguration.GameMode === 1 || GameConfiguration.GameMode === 0 && switchView === false") Randomize
      .col-md-6
        button.btn.btn-lg.btn-success(v-on:click="getRandomPlacement(2)" v-if="GameConfiguration.GameMode === 0 && switchView === true") Randomize
    .row.start-game-row
      button.btn.btn-primary.btn-lg.btn-block(v-if="GameConfiguration.GameMode === 1 ? firstBoardRandomized : (firstBoardRandomized && secondBoardRandomized)") Start game
      button.btn.btn-outline-primary.btn-lg.btn-block(v-if="!(GameConfiguration.GameMode === 1 ? firstBoardRandomized : (firstBoardRandomized && secondBoardRandomized))" disabled) Start game
</template>

<script>
  import GameBoard from "@/components/templates/GameBoard";

  export default {
    name: "ShipPlacement",
    components: {GameBoard},
    data() {
      return {
        GameConfiguration: null,
        GameBoard1: null,
        GameBoard2: null,
        switchView: false,
        firstBoardRandomized: false,
        secondBoardRandomized: false
      }
    },
    mounted: function () {
      let self = this
      this.$http.post(this.$config.API_BASE + 'getGameBoards', {
        BoardHeight: this.$route.query.boardHeight,
        BoardLength: this.$route.query.boardLength,
        ShipPreset: this.$route.query.shipPreset,
        GameMode: this.$route.query.gameMode
      }).then(res => {
        console.log(res.data)
        self.GameConfiguration = res.data.gameConfiguration
        self.GameBoard1 = res.data.gameBoard1
        self.GameBoard2 = res.data.gameBoard2
      })
    },
    methods: {
      getRandomPlacement: function (GameBoardNumber) {
        let self = this
        this.$http.post(this.$config.API_BASE + 'getRandomPlacement', {
          GameConfiguration: this.GameConfiguration
        }).then(res => {
          console.log(res.data)
          if (GameBoardNumber === 1) {
            self.GameBoard1 = res.data
            self.firstBoardRandomized = true
          }
          else {
            self.GameBoard2 = res.data
            self.secondBoardRandomized = true
          }
          self.$forceUpdate()
        })
      },
      changeView: function () {
        this.switchView = !this.switchView
      },
      isStartButtonEnabled: function () {
        return this.GameConfiguration.GameMode === 1 ? this.firstBoardRandomized : (this.firstBoardRandomized && this.secondBoardRandomized)
      }
    }
  }
</script>

<style scoped>
  h1 {
    margin-bottom: 40px;
  }

  .gameboard-row {
    height: 500px;
  }

  .button-row {
    margin-top: 30px;
  }

  .start-game-row {
    margin-top: 50px;
  }
</style>
