<template>
  <div>
    <div>
      <router-link to="/game/index">게임 매처</router-link>
      <router-link to="/game/number-baseball">숫자야구</router-link>
      <router-link to="/game/response-check">반응속도</router-link>
      <router-link to="/game/rock-scissors-paper">가위바위보</router-link>
      <router-link to="/game/lotto-generator">로또생성기</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  // 루트 컴포넌트
  import router from './route'

  export default {
    router,
  }

</script>

<style scoped>

</style>
