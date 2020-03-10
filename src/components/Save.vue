<template>
  <div class="user">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <h2>你關注的參賽者有 <span class="name-sub">{{ data.length }}</span> 位。</h2>
      <div class="row">
        <div class="col-md-4 col-6 mb-2" v-for="(item, index) in data" :key="index">
          <div class="card">
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
            <div class="card-footer text-muted">
              <button class="btn btn-primary w-100" @click.prevent="openModel(item)">
                文章列表
                <span class="badge badge-pill badge-success">{{ item.blogList.length}}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modals :modelData="modelData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import Medals from '@/components/Medals.vue';
import Modals from './Modals.vue';

interface UserData {
  keyID: string;
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
    Modals,
  },
})

export default class Save extends Vue {
  private data: Array<UserData> = [];

  private isLoading = true;

  private starData: Array<string> = [];

  private modelData = {};

  private getUserData(): void {
    this.isLoading = true;
    this.axios.get(process.env.VUE_APP_DATAURL).then((res) => {
      const cacheData: Array<UserData> = res.data;
      cacheData.forEach((item) => {
        const cacheItem = item;
        this.starData = JSON.parse(localStorage.getItem('w3hexschoolUser') || '[]');
        const result = this.starData.find((keyID: string) => keyID === item.keyID);
        if (result === undefined) {
          cacheItem.status = true;
        } else {
          cacheItem.status = false;
        }
      });
      this.filterData(cacheData);
    });
  }

  private filterData(data: Array<UserData>): void {
    const localUser = JSON.parse(
      localStorage.getItem('w3hexschoolUser') || '[]',
    );
    const arrayData: Array<UserData> = [];
    data.forEach((item) => {
      const cacheData = localUser.find((keyID: string) => keyID === item.keyID);
      if (cacheData !== undefined) {
        arrayData.push(item);
      }
    });
    this.data = arrayData;
    this.isLoading = false;
  }

  private removeStar(item: UserData): void {
    this.starData.forEach((data, index) => {
      if (item.keyID === data) {
        this.starData.splice(index, 1);
      }
    });
    localStorage.setItem('w3hexschoolUser', JSON.stringify(this.starData));
    this.getUserData();
  }

  private openModel(item: UserData): void {
    this.modelData = item;
    $('#myModel').modal('show');
  }

  public created(): void {
    this.getUserData();
  }
}
</script>
