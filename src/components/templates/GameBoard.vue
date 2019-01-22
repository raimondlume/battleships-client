<template lang="pug">
  table.table.table-bordered.table-hover.h-100
    tbody
      tr(v-for="y in gameBoard.Height")
        template(v-for="x in gameBoard.Length")
          td(v-if="gameBoard.BoardSquareArray[x][y].HasShip === false || opponentView === true" v-on:click="test(x, gameBoard.Height - (y - 1))").table-primary
          td(v-if="gameBoard.BoardSquareArray[x][y].HasShip === true && opponentView === false").table-dark
            <!--button.btn.btn-info(v-if="gameBoard.BoardSquareArray[x][y].HasShip === false")-->
            <!--button.btn.btn-danger(v-if="gameBoard.BoardSquareArray[x][y].HasShip === true")-->
</template>

<script>
  export default {
    name: "GameBoard",
    props: {
      data: {},
      gameBoard: Object,
      opponentView: Boolean
    },
    methods: {
      test: function (x, y) {
        console.log(`Clicked cell ${x} ${y}`)
      }
    }
  }
</script>

<style scoped>
</style>
