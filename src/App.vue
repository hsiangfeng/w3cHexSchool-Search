<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
  watch: {
    $route(to) {
      const nowTitle = `${to.meta.title} - W3HexSchool 全馬鐵人搜尋器` || 'W3HexSchool 全馬鐵人搜尋器';
      document.title = nowTitle;
    },
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
