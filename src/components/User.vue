<template>
  <div class="user">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row justify-content-center align-items-center mb-3">
        <div class="col-md-8">
          <form @keyup.enter.prevent>
            <div class="form-group">
              <label for="filterInputName">搜尋(支援作者名稱及部落格網址)</label>
              <input
                type="text"
                class="form-control"
                id="filterInputName"
                placeholder="Search"
                v-model="search"
              />
              <small id="emailHelp" class="form-text text-muted">支援模糊搜尋，但要注意英文大小寫問題。</small>
            </div>
            <div class="form-group">
              <label for="feature">功能操作</label>
              <select class="form-control" id="feature" @change="filterArticle" v-model="schedule">
                <option
                  v-for="(item, index) in selectData"
                  :key="index"
                  :value="item.number"
                >{{ item.title }}</option>
              </select>
            </div>
            <button
              type="button"
              class="btn btn-primary my-2"
              @click.prevent="reverse =!reverse; reverSort()"
            >時間排序</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-12 mb-2" v-for="(item, index) in filterData" :key="index">
          <div class="card">
            <div class="card-body">
              <!-- 目前挑戰狀態 -->
              <Medals :nowNumber="item.blogList.length" />
              <h5 class="card-title">
                <a
                  href="#"
                  @click.prevent="saveData(item, item.keyID); item.status = !item.status"
                  v-if="item.status"
                  title="加入關注"
                >
                  <font-awesome-icon :icon="['far','star']" />
                </a>
                <a
                  href="#"
                  @click.prevent="removeData(item, item.keyID); item.status = !item.status"
                  v-else
                  title="取消關注"
                >
                  <font-awesome-icon :icon="['fas','star']" />
                </a>
                &nbsp;
                &nbsp;
                <a
                  :href="item.blogUrl"
                  class="name-sub"
                  target="_blank"
                >{{ item.name || '參賽者未公開暱稱'}}</a>
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
    <a href="#" @click.prevent="scrollTop">
      <div id="gotop" class="gotop">
        <font-awesome-icon :icon="['fas','arrow-up']" />
      </div>
    </a>
    <Modals :modelData="modelData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import Modals from './Modals.vue';
import Medals from './Medals.vue';

interface UserData {
  keyID: string;
  blogList: Array<object>;
  blogUrl: string;
  name: string;
  updateTime: string;
  status: boolean;
}

@Component({
  name: 'User',
  components: {
    Medals,
    Modals,
  },
})

export default class User extends Vue {
  private data: Array<UserData> = [];

  private dataBackup: Array<UserData> = [];

  private isLoading = true;

  private search = '';

  private reverse = false;

  private starData: Array<string> = [];

  private modelData = {};

  private selectData = [
    {
      title: '看全部文章',
      number: 0,
    },
    {
      title: '銅角獎文章',
      number: 10,
    },
    {
      title: '銀角獎文章',
      number: 25,
    },
    {
      title: '金角獎文章',
      number: 40,
    },
  ];

  private schedule = 0;

  private get filterData(): Array<UserData> {
    return this.data.filter(
      (item) => String(item.blogUrl).match(this.search.trim())
        || String(item.name).match(this.search.trim()),
    );
  }

  private getData(): void {
    this.isLoading = true;

    this.axios.get(process.env.VUE_APP_DATAURL).then((res) => {
      const cacheData: Array<UserData> = res.data;
      cacheData.forEach((item) => {
        const cacheItem = item;

        this.starData = JSON.parse(
          localStorage.getItem('w3hexschoolUser') || '[]',
        );

        const result = this.starData.find(
          (keyID: string) => keyID === item.keyID,
        );
        if (result === undefined) {
          cacheItem.status = true;
        } else {
          cacheItem.status = false;
        }
      });

      this.data = cacheData;
      this.dataBackup = cacheData;
      this.isLoading = false;
    });
  }

  private reverSort(): void {
    if (this.reverse) {
      this.data.sort((a, b) => (a.updateTime < b.updateTime ? -1 : 1));
    } else {
      this.data.sort((a, b) => (a.updateTime < b.updateTime ? 1 : -1));
    }
  }

  private saveData(item: UserData, keyID: string): void {
    const findData = this.starData.find((blogItem) => blogItem === keyID);

    if (findData === undefined) {
      this.starData.push(keyID);
      localStorage.setItem('w3hexschoolUser', JSON.stringify(this.starData));
    }
  }

  private filterArticle(): void {
    const cacheData: Array<UserData> = [];
    if (this.schedule === 0) {
      this.data = this.dataBackup;
    } else {
      this.data.forEach((item: UserData) => {
        if (item.blogList.length === this.schedule) {
          cacheData.push(item);
        }
      });
      this.data = cacheData;
    }
  }

  private removeData(item: UserData): void {
    this.starData.forEach((data, index) => {
      if (item.keyID === data) {
        this.starData.splice(index, 1);
      }
    });
    localStorage.setItem('w3hexschoolUser', JSON.stringify(this.starData));
  }

  private openModel(item: UserData): void {
    this.modelData = item;
    $('#myModel').modal('show');
  }

  private scrollTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  public created(): void {
    this.getData();

    $(window).scroll(() => {
      const top = $(document).scrollTop();
      if (top >= 200) {
        $('#gotop').css('opacity', 1);
      } else {
        $('#gotop').css('opacity', 0);
      }
    });
  }
}
</script>

<style lang="scss">
.gotop {
  opacity: 0;
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #00cc99;
  transition: all 0.3s;
  color: white;
}
</style>
