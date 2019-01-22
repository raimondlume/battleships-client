<template lang="pug">
  .container
    .row.align-items-center
      .col
        h1 {{ getHeader() }}
      .col
        h5.float-right Game ID: {{ GameId }}
    .row.gameboard-row
      .col-md-6
        game-board(v-bind:gameBoard="GameBoard1" v-bind:opponent-view="isOpponentView(1)" v-bind:disable-hits="!isOpponentView(1)" v-bind:board-owner="1")
        span Remaining ships: {{getRemainingShips(1)}}
      .col-md-6
        game-board(v-bind:gameBoard="GameBoard2" v-bind:opponent-view="isOpponentView(2)" v-bind:disable-hits="!isOpponentView(2)" v-bind:board-owner="2")
        span Remaining ships: {{getRemainingShips(2)}}
    .alert.alert-success(role="alert" v-if="GameOver") Game over!
</template>

<script>
  import GameBoard from "@/components/templates/GameBoard";

  export default {
    name: "Game",
    components: {GameBoard},
    data() {
      return {
        GameId: null,
        GameBoard1: null,
        GameBoard2: null,
        GameMode: null,
        GameEventHistory: null,
        CurrentPlayer: null,
        GameOver: false
      }
    },
    created: function () {
      let self = this
      this.$http.get(this.$config.API_BASE + this.$route.params.gameID).then(res => {
        console.log(res.data)
        self.GameId = res.data.id
        self.GameBoard1 = res.data.Player1GameBoard
        self.GameBoard2 = res.data.Player2GameBoard
        self.GameMode = res.data.GameMode
        self.GameEventHistory = res.data.GameEventHistory
        self.CurrentPlayer = res.data.CurrentPlayer;
      })
    },
    updated: function () {
      let self = this
      if (this.GameMode === 1 && this.CurrentPlayer === 2) {
        let self = this
        this.$http.post(this.$config.API_BASE + 'AIshoot', {
          GameId: this.GameId
        }).then(res => {
          if (res.data === "False") {
            console.log("iftrigger")
            this.CurrentPlayer = 1
          }
          console.log(res.data)
          self.updatePage()
        })
      }
    },
    methods: {
      getHeader: function () {
        return this.CurrentPlayer === 1
          ? "Player 1's turn"
          : this.gameMode === 0 ? "Player 2's turn" : "AI's turn"
      },
      isOpponentView: function (GameBoardNumber) {
        if (this.GameMode === 1) return GameBoardNumber !== 1
        if (GameBoardNumber === 1) return this.CurrentPlayer !== 2
        if (GameBoardNumber === 2) return this.CurrentPlayer !== 1
      },
      updatePage: function () {
        let self = this
        this.$http.get(this.$config.API_BASE + this.$route.params.gameID).then(res => {
          console.log(res.data)
          self.GameId = res.data.id
          self.GameBoard1 = res.data.Player1GameBoard
          self.GameBoard2 = res.data.Player2GameBoard
          self.GameMode = res.data.GameMode
          self.GameEventHistory = res.data.GameEventHistory
          self.CurrentPlayer = res.data.CurrentPlayer;
        })
        if (this.getRemainingShips(1) === 0 || this.getRemainingShips(2) === 0) {
          this.GameOver = true;
        }
        this.$forceUpdate()
      },
      getRemainingShips: function (GameBoardNumber) {
        let gameBoard = GameBoardNumber === 1 ? this.GameBoard1 : this.GameBoard2;
        let remainingShips = gameBoard.Ships.length;
        gameBoard.Ships.forEach(function (ship) {
          let shipLength = ship.BoardSquares.length;
          let count = 0;
          ship.BoardSquares.forEach(function (boardSquare) {
            if (gameBoard.BoardSquareArray[boardSquare.XCoord][boardSquare.YCoord].IsHit) count++;
          });
          if (shipLength === count) remainingShips--;
        });
        return remainingShips;
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
</style>
