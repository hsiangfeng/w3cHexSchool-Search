<template>
  <div>
    <div
      class="badge badge-secondary float-right"
      v-if="nowNumber <= 9"
    >目前：挑戰銅角獎中...🏃</div>
    <div
      class="badge badge-success float-right"
      v-else-if="nowNumber === 10"
    >目前：銅角獎🏅 Get!</div>
    <div
      class="badge badge-secondary float-right"
      v-else-if="nowNumber <= 24"
    >目前：挑戰銀角獎中...🏃</div>
    <div
      class="badge badge-success float-right"
      v-else-if="nowNumber === 25"
    >目前：銀角獎🎖 Get!</div>
    <div
      class="badge badge-secondary float-right"
      v-else-if="nowNumber <= 39"
    >目前：挑戰金角獎中...🏃</div>
    <div
      class="badge badge-success float-right"
      v-else-if="nowNumber === 40"
    >目前：金角獎🏆 Get!</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Medals',
})

export default class Medals extends Vue {
  @Prop(Number) private nowNumber!: number;
}
</script>
