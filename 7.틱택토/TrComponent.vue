<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :key="index" :cell-data="cellData" :cell-index="index" :row-index="rowIndex"></td-component>
  </tr>
</template>

<script>
  import TdComponent from './TdComponent';
  //cellData[0] = rowData[0]
  export default {
    components: {
      TdComponent,
    },
    props: {
      rowData: Array,
      rowIndex: Number,
    },

    computed: {

    },
  }

</script>

<style scoped>

</style>

