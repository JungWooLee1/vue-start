<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" v-bind:number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" v-bind:number ="bonus"></lotto-ball>
    <button @click="onClickRedo" v-if="redo">한 번 더!</button>
  </div>
</template>

<script>
  import LottoBall from './LottoBall'

  function getWinNumbers() {
    console.log('getWindNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber]
  }

  const timeouts = [];
  export default {
    components: {
      'lotto-ball': LottoBall
    },

    data() {
      return {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
      };
    },
    computed: {

    },
    methods: {
      onClickRedo() {
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;

        this.showBalls();
      },

      showBalls() {
        for (let i = 0; i < this.winNumbers.length - 1; i++) {
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i]);
          }, (i + 1) * 1000)
        }
        timeouts[6] =  setTimeout(() => {
          this.bonus = this.winNumbers[6];
          this.redo = true;
        }, 7000)
      }
    },

    // 컴포넌트가 화면에 그려질 때 수행됨
    mounted() {
      this.showBalls();
    },
    beforeDestroy() {
      timeouts.forEach((t) => {
        clearTimeout(t);
      });
    },
    watch: {
      winBalls(value, oldValue) {
        console.log(value, oldValue);
        if (value.length === 0) {
          this.showBalls();
        }
      }
    },
  }

</script>

<style scoped>
  #computer {
    width: 142px;
    height: 200px;
    background-position: 0 0;
  }

</style>
