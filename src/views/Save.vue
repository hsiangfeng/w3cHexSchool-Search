<template>
  <div class="user">
    <div class="container">
      <form>
        <div class="form-group">
          <label for="filterInputName">Filter</label>
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
          >We'll never share your email with anyone else.</small>
        </div>
      </form>
      <h2>你關注的參賽者</h2>
      <p>
        挑戰人數共有
        <span class="name-sub">{{ data.length }}</span> 位。
      </p>
      <div class="card-columns">
        <div class="card" v-for="(item, index) in data" :key="index">
          <!-- <img src="..." class="card-img-top" alt="..."> -->
          <div class="card-body">
            <!-- 目前挑戰狀態 -->
            <Medals :nowNumber="item.blogList.length" @status="openModel"/>
            <h5 class="card-title">
              <a href="#" @click="saveUser(item)"><font-awesome-icon :icon="['far','star']" /></a>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Medals from '@/components/Medals.vue';
import Models from '@/components/Models.vue';

interface UserData {
  blogList: Array<object>;
  blogUrl: string;
  name: string;
  updateTime: string;
}

interface UserUrl {
  blogUrl: string;
}

@Component({
  name: 'Save',
  components: {
    Medals,
    Models,
  },
})
export default class Save extends Vue {
  private data: Array<UserData> = [];

  search = '';

  modelMessate = '';

  private isLoading!: boolean;

  private getUserData() {
    this.isLoading = true;
    this.axios.get(process.env.VUE_APP_DATAURL).then((res) => {
      this.filterData(res.data);
    });
  }

  openModel(status: string) {
    const message: string = status;
    this.modelMessate = message;
    $('#model').modal('toggle');
  }

  filterData(data: Array <UserData>) {
    const localUser = JSON.parse(localStorage.getItem('user') || '');
    const arrayData: Array<UserData> = [];
    data.forEach((item) => {
      const cacheData = localUser.find((url: string) => url === item.blogUrl);
      if (cacheData !== undefined) {
        arrayData.push(item);
      }
    });
    this.data = arrayData;
    this.isLoading = false;
  }

  created() {
    this.getUserData();
  }
}
</script>
