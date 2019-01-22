<template lang="pug">
  table.table.table-bordered.table-hover.h-100
    tbody
      tr(v-for="y in gameBoard.Height")
        td(v-for="x in gameBoard.Length" v-bind:class="getCellColor(x, y)" v-on:click="shoot(x, y)")
</template>

<script>
  export default {
    name: "GameBoard",
    props: {
      data: {
      },
      gameBoard: Object,
      opponentView: Boolean,
      disableHits: Boolean,
      boardOwner: Number
    },
    methods: {
      getCellColor: function (x, y) {
        let cell = this.gameBoard.BoardSquareArray[x][y]
        if (this.opponentView) {
          if (cell.HasShip) return cell.IsHit ? 'bg-danger' : 'table-primary'
          else return cell.IsHit ? 'table-warning' : 'table-primary'
        } else {
          if (cell.HasShip) return cell.IsHit ? 'bg-danger' : 'table-dark'
          else return cell.IsHit ? 'table-warning' : 'table-primary'
        }
      },
      test: function (x, y) {
        if (this.disableHits) return
        this.gameBoard.BoardSquareArray[x][y].IsHit = true
      },
      shoot: function (x, y) {
        let cell = this.gameBoard.BoardSquareArray[x][y]
        if (this.disableHits || cell.IsHit) return

        let self = this
        this.$http.post(this.$config.API_BASE + 'shoot', {
          GameId: this.$parent.GameId,
          BoardNumber: this.boardOwner,
          ShootX: x,
          ShootY: y
        }).then(res => {
          const wasHit = res.data
          console.log(wasHit)
          self.$parent.updatePage()
        })
      }
    }
  }
</script>

<style scoped>
</style>
