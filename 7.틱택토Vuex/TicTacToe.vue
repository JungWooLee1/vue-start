<template>
  <div>
    <div>{{turn}}님의 턴입니다.</div>
    <table-component :table-data="tableData"/>
    <div v-if="winner">{{winner}}님이 승리하셨습니다.</div>
  </div>
</template>

<script>
  import TableComponent from './TableComponent'
  import EventBus from './EventBus';

  export default {
    components: {
      TableComponent
    },
    data() {
      return {
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O',
        winner: ''
      };
    },
    methods: {
      onClickTd(rowIndex, cellIndex) {
        this.$set(this.tableData[rowIndex], cellIndex, this.turn);

        let win = false;
        // 가로줄 검사
        if (this.tableData[rowIndex][0] === this.turn
          && this.tableData[rowIndex][1] === this.turn
          && this.tableData[rowIndex][2] === this.turn) {
          win = true;
        }
        // 세로줄 검사
        if (this.tableData[0][cellIndex] ===this.turn
          && this.tableData[1][cellIndex] ===this.turn
          && this.tableData[2][cellIndex] ===this.turn){
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

        if(win) { // 이긴 경우 : 3줄 달성
          this.winner = this.turn;
          this.turn = 'O';
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
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
            this.turn = 'O';
            this.winner = '';
            this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          } else {
            this.turn = this.turn === 'O' ? 'X' : 'O';
          }
        }
      }
    },
    created() {
      EventBus.$on('clickTd', this.onClickTd);
    }
  }

</script>

<style scoped>

</style>
