<template>
  <div>
    <div>{{turn}}님의 턴입니다.</div>
    <table-component :table-data="tableData"/>
    <div v-if="winner">{{winner}}님이 승리하셨습니다.</div>
  </div>
</template>

<script>
  import TableComponent from './TableComponent'

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
    },
  }

</script>

<style scoped>

</style>
