<template>
  <div class="modal fade" id="myModel" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">您正在看 <span class="name-sub">{{ modelData.name }}</span> 的文章</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            <ul class="list-group">
              <li class="list-group-item list-group-item-action" v-for="(blog, index) in modelData.blogList" :key="index">
                <a
                  :href="blog.url"
                  class="name-sub"
                  target="_blank"
                >{{ index + 1 }}.{{ blog.title }}</a>
              </li>
            </ul>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface UserData {
  blogList: Array<object>;
  blogUrl: string;
  name: string;
  updateTime: string;
  status: boolean;
}

@Component({
  name: 'Modals',
})

export default class Models extends Vue {
  @Prop(Object) private modelData!: UserData;
}
</script>

<style>
</style>
