<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <Header/>
      <div class="row">
        <div class="col-md-3 col-6">
          <div class="index">
            <div class="index__round bg-primary text-white">
              <div class="index__round__number">
                參賽人數
                <br />
                <ICountUp :delay="delay" :endVal="ICountUpOptions.people"></ICountUp>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="index">
            <div class="index__round  bg-principal text-primary">
              <div class="index__round__number">
                文章數量
                <br />
                <ICountUp :delay="delay" :endVal="ICountUpOptions.article"></ICountUp>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="index">
            <div class="index__round bg-success text-white">
              <div class="index__round__number">
                公開暱稱人數
                <br />
                <ICountUp :delay="delay" :endVal="ICountUpOptions.public"></ICountUp>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="index">
            <div class="index__round bg-main text-primary">
              <div class="index__round__number">
                不公開人數
                <br />
                <ICountUp :delay="delay" :endVal="ICountUpOptions.private"></ICountUp>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/shared/Header.vue';
import ICountUp from 'vue-countup-v2';

interface UserData {
  blogList: Array<object>;
  blogUrl: string;
  name: string;
  updateTime: string;
}

interface BlogList {
  title: string;
  url: string;
}

@Component({
  name: 'Index',
  components: {
    Header,
    ICountUp,
  },
})
export default class Index extends Vue {
  private data: Array<UserData> = [];

  private isLoading = true;

  private delay = 1000;

  private ICountUpOptions = {
    people: 0,
    article: 0,
    public: 0,
    private: 0,
  };

  private getUserData() {
    this.isLoading = true;
    this.axios.get(process.env.VUE_APP_DATAURL).then((res) => {
      this.data = res.data;
      this.getArticle();
    });
  }

  private getArticle() {
    const cacheData: Array<UserData> = this.data;
    const articleArray: Array<object> = [];
    cacheData.forEach((data) => {
      const { blogList } = data;
      blogList.forEach((item) => {
        articleArray.push(item);
      });
    });

    const cachePublic: Array<UserData> = [];
    const cachePrivate: Array<UserData> = [];

    cacheData.forEach((data) => {
      if (data.name !== null) {
        cachePublic.push(data);
      } else {
        cachePrivate.push(data);
      }
    });

    this.ICountUpOptions.people = this.data.length;
    this.ICountUpOptions.article = articleArray.length;
    this.ICountUpOptions.public = cachePublic.length;
    this.ICountUpOptions.private = cachePrivate.length;

    this.isLoading = false;
  }

  private created() {
    this.getUserData();
  }
}
</script>

<style lang="scss">
$main: #00cc99;
$principal: #69F0AE;

.bg-main {
  background-color: $main;
}

.bg-principal {
  background-color: $principal;
}

.index {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.index__round {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  &__number {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media (max-width: 576px) {
    width: 150px;
    height: 150px;
  }
  @media (max-width:992px) {
    width: 150px;
    height: 150px;
  }
}
</style>
