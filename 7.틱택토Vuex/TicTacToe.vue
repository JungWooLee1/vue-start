<template>
  <div>
    <div>{{turn}}님의 턴입니다.</div>
    <table-component/>
    <div v-if="winner">{{winner}}님이 승리하셨습니다.</div>
  </div>
</template>

<script>
  import store from './store';
  import TableComponent from './TableComponent';
  import { mapState } from 'vuex';
  export default {
    store,
    components: {
      TableComponent
    },
    computed: {
      ...mapState({
        winner(state) {
          return state.winner;
        },
        turn: state => state.turn,
      })
    }
  }

</script>

<style scoped>

</style>
