<template>
  <div>
    <div
      href="#"
      class="badge badge-secondary float-right"
      v-if="nowNumber <= 9"
    >挑戰銅角獎中...🏃</div>
    <div
      href="#"
      class="badge badge-success float-right"
      v-else-if="nowNumber === 10"
    >銅角獎🏅 Get!</div>
    <div
      href="#"
      class="badge badge-secondary float-right"
      v-else-if="nowNumber <= 24"
    >挑戰銀角獎中...🏃</div>
    <div
      href="#"
      class="badge badge-success float-right"
      v-else-if="nowNumber === 25"
    >銀角獎🎖 Get!</div>
    <div
      href="#"
      class="badge badge-secondary float-right"
      v-else-if="nowNumber <= 39"
    >挑戰金角獎中...🏃</div>
    <div
      href="#"
      class="badge badge-success float-right"
      v-else-if="nowNumber === 40"
    >金角獎🏆 Get!</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Medals extends Vue {
  @Prop() private nowNumber!: number;
}
</script>
