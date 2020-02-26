<template>
  <div>
    <a
      href="#"
      class="badge badge-secondary float-right"
      v-if="nowNumber <= 9"
      @click.prevent="modelData('挑戰銅角獎中...🏃')"
    >挑戰銅角獎中...🏃</a>
    <a
      href="#"
      class="badge badge-success float-right"
      v-else-if="nowNumber === 10"
      @click.prevent="modelData('銅角獎🏅 Get!')"
    >銅角獎🏅 Get!</a>
    <a
      href="#"
      class="badge badge-secondary float-right"
      v-else-if="nowNumber <= 24"
      @click.prevent="modelData('挑戰銀角獎中...🏃')"
    >挑戰銀角獎中...🏃</a>
    <a
      href="#"
      class="badge badge-success float-right"
      v-else-if="nowNumber === 25"
      @click.prevent="modelData('銀角獎🎖 Get!')"
    >銀角獎🎖 Get!</a>
    <a
      href="#"
      class="badge badge-secondary float-right"
      v-else-if="nowNumber <= 39"
      @click="modelData('挑戰金角獎中...🏃')"
    >挑戰金角獎中...🏃</a>
    <a
      href="#"
      class="badge badge-success float-right"
      v-else-if="nowNumber === 40"
      @click.prevent="modelData('金角獎🏆 Get!')"
    >金角獎🏆 Get!</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Medals extends Vue {
  @Prop() private nowNumber!: number;

  modelData(status: string) {
    this.$emit('status', status);
  }
}
</script>
