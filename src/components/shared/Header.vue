<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-5">W3HexSchool 全馬挑戰</h1>
      <p class="lead">這是透過六角學院所提供的 W3CHexSchool API 所製作的查詢系統，其主要方便確認自己是否報名成功以及關注系列文章。</p>
      <p>
        <small>W3HexSchool API 三十分鐘更新一次。</small>
      </p>
      <hr class="my-4">
      <p>
        如果想了解更詳細相關 W3HexSchool API 可以點下方按鈕查看。
      </p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="https://github.com/hexschool/w3hexschool-API" role="button" target="_black">查看 API</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Header',
})

export default class Navbar extends Vue {
}
</script>
