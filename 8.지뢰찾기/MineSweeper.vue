<template>
  <div>
    <mine-form/>
    <div>{{timer}}</div>
    <table-component />
    <div>{{result}}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import store, {INCREMENT_TIMER} from './store';

  import TableComponent from './TableComponent';
  import MineForm from './MineForm';

  let interval;
  export default {
    store,
    components: {
      TableComponent,
      MineForm,
    },
    computed: {
      ...mapState(['timer', 'result', 'halted']),
    },
    methods: {

    },
    watch: {
      halted(value, oldValue) {
        if (value === false) { // false일 때 게임 시작
          interval = setInterval(() => {
            this.$store.commit(INCREMENT_TIMER);
          }, 1000)
        } else {
          clearInterval(interval);
        }
      }
    }
  }

</script>

<style scoped>

</style>
