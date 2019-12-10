<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  export default {
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },
    methods: {
      onClickTd() {
        if (this.cellData) return;

        let rootData = this.$root.$data;
        this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

        let win = false;
        // 가로줄 검사
        if (rootData.tableData[this.rowIndex][0] === rootData.turn
          && rootData.tableData[this.rowIndex][1] === rootData.turn
          && rootData.tableData[this.rowIndex][2] === rootData.turn) {
          win = true;
        }
        // 세로줄 검사
        if (rootData.tableData[0][this.cellIndex] ===rootData.turn
          && rootData.tableData[1][this.cellIndex] ===rootData.turn
          && rootData.tableData[2][this.cellIndex] ===rootData.turn){
          win = true;
        }
        // 대각선 검사
        if (rootData.tableData[0][0] ===rootData.turn
          && rootData.tableData[1][1] ===rootData.turn
          && rootData.tableData[2][2] ===rootData.turn){
          win = true;
        }
        // 대각선 검사 2
        if (rootData.tableData[0][2] ===rootData.turn
          && rootData.tableData[1][1] ===rootData.turn
          && rootData.tableData[2][0] ===rootData.turn){
          win = true;
        }

        if(win) { // 이긴 경우 : 3줄 달성
          rootData.winner = rootData.turn;
          rootData.turn = 'O';
          rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        } else { // 무승부 또는 게임중
          let all = true; // all이 true면 무승부라는 뜻
          rootData.tableData.forEach((row) => {
            row.forEach((cell) => {
              // 빈문자열 체크
              if (!cell) {
                all = false
              }
            })
          });
          if (all) { // 무승부
            rootData.turn = 'O';
            rootData.winner = '';
            rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          } else {
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>

