<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  import { mapState } from 'vuex';
  import {CLICK_CELL, RESET_GAME, SET_WINNER, NO_WINNER, CHANGE_TURN} from './store';

  export default {
    props: {
      rowIndex: Number,
      cellIndex: Number,
    },

    computed: {
      ...mapState({
        tableData: state => state.tableData,
        turn: state => state.turn,
        cellData(state) {
        return state.tableData[this.rowIndex][this.cellIndex];
        }
      })
      // cellData() {
      //   return this.$store.state.tableData[this.rowIndex][this.cellIndex];
      // },
      // tableData() {
      //   return this.$store.state.tableData;
      // },
      // turn() {
      //   return this.$store.state.turn;
      // }
    },

    methods: {
      onClickTd() {
        if (this.cellData) return;

        //this.$set(this.tableData[rowIndex], cellIndex, this.turn);
        this.$store.commit('CLICK_CELL', {row: this.rowIndex, cell: this.cellIndex});

        let win = false;
        // 가로줄 검사
        if (this.tableData[this.rowIndex][0] === this.turn
          && this.tableData[this.rowIndex][1] === this.turn
          && this.tableData[this.rowIndex][2] === this.turn) {
          win = true;
        }
        // 세로줄 검사
        if (this.tableData[0][this.cellIndex] ===this.turn
          && this.tableData[1][this.cellIndex] ===this.turn
          && this.tableData[2][this.cellIndex] ===this.turn){
          win = true;
        }
        // 대각선 검사
        if (this.tableData[0][0] ===this.turn
          && this.tableData[1][1] ===this.turn
          && this.tableData[2][2] ===this.turn){
          win = true;
        }
        // 대각선 검사 2
        if (this.tableData[0][2] ===this.turn
          && this.tableData[1][1] ===this.turn
          && this.tableData[2][0] ===this.turn){
          win = true;
        }

        if (win) { // 이긴 경우 : 3줄 달성
          this.$store.commit(SET_WINNER, this.turn);
          this.$store.commit(RESET_GAME);
        } else { // 무승부 또는 게임중
          let all = true; // all이 true면 무승부라는 뜻
          this.tableData.forEach((row) => {
            row.forEach((cell) => {
              // 빈문자열 체크
              if (!cell) {
                all = false
              }
            })
          });
          if (all) { // 무승부
            this.$store.commit(NO_WINNER);
            this.$store.commit(RESET_GAME);
          } else {
            this.$store.commit(CHANGE_TURN);
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>

