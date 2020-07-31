<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <Header />
      <h3 class="h3 text-center">參賽人數</h3>
      <div class="row mb-5">
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
            <div class="index__round bg-principal text-primary">
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
      <h3 class="h3 text-center">得獎戰況</h3>
      <div class="row">
        <div class="col-md-3">
          <div class="index">
            <div class="index__round bg-principal text-primary">
              <div class="index__round__number">
                銅角獎🏅 人數
                <br />
                <ICountUp :delay="delay" :endVal="copper"></ICountUp>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="index">
            <div class="index__round bg-principal text-primary">
              <div class="index__round__number">
                銀角獎🎖 人數
                <br />
                <ICountUp :delay="delay" :endVal="silver"></ICountUp>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="index">
            <div class="index__round bg-principal text-primary">
              <div class="index__round__number">
                金角獎🏆 人數
                <br />
                <ICountUp :delay="delay" :endVal="gold"></ICountUp>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="index">
            <div class="index__round bg-principal text-primary">
              <div class="index__round__number">
                未得獎人數
                <br />
                <ICountUp :delay="delay" :endVal="noPrize"></ICountUp>
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

  private copper = 0;

  private silver = 0;

  private gold = 0;

  private noPrize = 0;

  private getData(): void {
    this.isLoading = true;
    this.axios.get(process.env.VUE_APP_DATAURL).then((res) => {
      this.data = res.data;
      this.getArticle();
      this.getAwarded();
    });
  }

  private getAwarded(): void {
    this.data.forEach((data) => {
      const leng: number = data.blogList.length;
      switch (leng) {
        case 10:
          this.copper += 1;
          break;
        case 25:
          this.silver += 1;
          break;
        case 40:
          this.gold += 1;
          break;
        default:
          this.noPrize += 1;
          break;
      }
    });
  }

  private getArticle(): void {
    const articleArray: Array<object> = [];
    const cachePublic: Array<UserData> = [];
    const cachePrivate: Array<UserData> = [];

    this.data.forEach((data) => {
      const { blogList } = data;
      blogList.forEach((item) => {
        articleArray.push(item);
      });
    });

    this.data.forEach((data) => {
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

  public created(): void {
    this.getData();
  }
}
</script>

<style lang="scss">
$main: #00cc99;
$principal: #69f0ae;

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
  @media (max-width: 992px) {
    width: 150px;
    height: 150px;
  }
}
</style>
