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
        let rootData = this.$root.$data;
        console.log(rootData);
        this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
        rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
      }
    }
  }
</script>

<style scoped>

</style>

