<template>
  <div class="user">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <h2>你關注的參賽者有<span class="name-sub">{{ data.length }}</span> 位。</h2>
      <div class="row">
        <div class="col-md-4 col-6 mb-2" v-for="(item, index) in data" :key="index">
          <div class="card">
            <!-- <img src="..." class="card-img-top" alt="..."> -->
            <div class="card-body">
              <!-- 目前挑戰狀態 -->
              <Medals :nowNumber="item.blogList.length" />
              <h5 class="card-title">
                <a href="#" @click="removeStar(item)">
                  <font-awesome-icon :icon="['far','star']" v-if="item.status"/>
                  <font-awesome-icon :icon="['fas','star']" v-else/>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Medals from '@/components/Medals.vue';

interface UserData {
  blogList: Array<object>;
  blogUrl: string;
  name: string;
  updateTime: string;
  status: boolean;
}

@Component({
  name: 'Save',
  components: {
    Medals,
  },
})

export default class Save extends Vue {
  private data: Array<UserData> = [];

  private isLoading = true;

  private starData: Array<string> = [];

  private getUserData() {
    this.isLoading = true;
    this.axios.get(process.env.VUE_APP_DATAURL).then((res) => {
      const cacheData: Array<UserData> = res.data;
      cacheData.forEach((item) => {
        const cacheItem = item;
        this.starData = JSON.parse(localStorage.getItem('w3hexschoolUser') || '[]');
        const result = this.starData.find((url: string) => url === item.blogUrl);
        if (result === undefined) {
          cacheItem.status = true;
        } else {
          cacheItem.status = false;
        }
      });
      this.filterData(cacheData);
    });
  }

  private filterData(data: Array<UserData>) {
    const localUser = JSON.parse(
      localStorage.getItem('w3hexschoolUser') || '[]',
    );
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

  private removeStar(item: UserData) {
    this.starData.forEach((blogUrl, index) => {
      if (item.blogUrl === blogUrl) {
        this.starData.splice(index, 1);
      }
    });
    localStorage.setItem('w3hexschoolUser', JSON.stringify(this.starData));
    this.getUserData();
  }

  public created() {
    this.getUserData();
  }
}
</script>
