<template>
  <div class="user">
    <div class="container">
      <form>
        <div class="form-group">
          <label for="filterInputName">搜尋文章</label>
          <input
            type="text"
            class="form-control"
            id="filterInputName"
            placeholder="Search"
            v-model="search"
          />
          <small
            id="emailHelp"
            class="form-text text-muted"
          >僅限搜名稱，支援模糊搜尋，但要英文注意大小寫問題。</small>
        </div>
      </form>
      <div class="card-columns">
        <div class="card" v-for="(item, index) in filterData" :key="index">
          <div class="card-body">
            <!-- 目前挑戰狀態 -->
            <Medals :nowNumber="item.blogList.length" @status="openModel" />
            <h5 class="card-title">
              <a href="#" @click="saveUser(item.blogUrl)">
                <font-awesome-icon :icon="['far','star']" />
              </a>
              <a :href="item.blogUrl" class="name-sub">{{ item.name || '參賽者未公開暱稱'}}</a>
            </h5>
            <p class="card-text">更新時間：{{ item.updateTime }}</p>
            <h6>目前進度：</h6>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                :style="`width: ${(item.blogList.length * 2.5)}%;`"
                aria-valuemin="0"
                aria-valuemax="100"
              >{{item.blogList.length * 2.5 }} %</div>
            </div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(blog, index) in item.blogList" :key="index">
              <a :href="blog.url" class="name-sub">{{ index + 1 }}.{{ blog.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Models :messages="modelMessate" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import Medals from './Medals.vue';
import Models from './Models.vue';

interface UserData {
  blogList: Array<object>;
  blogUrl: string;
  name: string;
  updateTime: string;
}

@Component({
  name: 'User',
  components: {
    Medals,
    Models,
  },
})
export default class User extends Vue {
  private data: Array<UserData> = [];

  private isLoading = true;

  search = '';

  modelMessate = '';

  private cacheData: Array<string> = [];

  get filterData() {
    return this.data.filter((item) => {
      if (this.search.trim() === item.name) {
        return item.name === this.search.trim();
      }
      return String(item.name).match(this.search.trim());
    });
  }

  private getUserData() {
    this.isLoading = true;
    this.axios.get(process.env.VUE_APP_DATAURL).then((res) => {
      this.data = res.data;
      this.isLoading = false;
    });
  }

  openModel(status: string) {
    const message: string = status;
    this.modelMessate = message;
    $('#model').modal('toggle');
  }

  saveUser(url: string) {
    const data = this.cacheData.find((item) => item === url);
    if (data === undefined) {
      this.cacheData.push(url);
      localStorage.setItem('user', JSON.stringify(this.cacheData));
    }
  }

  created() {
    this.getUserData();
  }
}
</script>
