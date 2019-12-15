<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :key="index" :row-index="index"></tr-component>
  </table>
</template>

<script>
  import TrComponent from './TrComponent';

  export default {
    components: {
      TrComponent
    },
    computed: {
      tableData() {
        return this.$store.state.tableData;
      }
    }
  }

</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }


</style>

