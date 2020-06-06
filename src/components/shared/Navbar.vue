<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo03"
      aria-controls="navbarTogglerDemo03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">全馬挑戰搜尋器</a>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Index' }">
            <font-awesome-icon :icon="['fas','home']"/>
            首頁
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'User' }">
            <font-awesome-icon :icon="['fas','newspaper']"/>
            文章列表
            </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Save' }">
            <font-awesome-icon :icon="['fas','heart']"/>
            關注的文章
            </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Navbar',
})

export default class Navbar extends Vue {
}
</script>
